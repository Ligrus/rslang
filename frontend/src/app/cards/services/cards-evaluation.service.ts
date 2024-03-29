/**
 * This is the algorithm used in Fresh Cards, as of v2.0.
 *
 * Similar to Anki, this is based on the general ideas of SM-2 and makes
 * these adjustments:
 *
 * - give bonus if card is reviewed late, but still remembered correctly
 * - don't adjust efactor if card is being learned
 * - go back to "learning" stage if you fail a card, to avoid being punished
 *   each time you get it wrong
 * - review times are "fuzzed" to avoid bunching up the same cards in lessons
 *
 * Since Fresh Cards schedules cards *within* a lesson differently from Anki,
 * the initial intervals are 30m, 12h, and 1d instead of 1m, 10m, 1d.
 *
 * Visit https://www.ussherpress.com/freshcards/ to check out the app.
 */

import { Injectable } from '@angular/core';
import * as dayjs from 'dayjs';
import { ApiHttpService } from 'src/app/shared/services/http.service';
@Injectable()
export class CardsEvaluationService {
  constructor(httpService: ApiHttpService) {}

  getReviewLateness(
    plannedReviewDate: string,
    actualReviewDate: string,
    reviewInterval: number
  ) {
    const reviewsDiff = dayjs(actualReviewDate).diff(
      plannedReviewDate,
      'day',
      true
    );
    if (reviewsDiff === 0) return reviewsDiff;
    return Number((reviewsDiff / reviewInterval).toFixed(2));
  }

  findPreliminaryDate(
    preliminaryDate: string,
    timeUnit: 'day' | 'hour' | 'minute',
    timeAmount: number
  ) {
    const current = dayjs(preliminaryDate);
    const reviewDate = current.add(timeAmount, timeUnit);
    return reviewDate.toISOString();
  }

  getNextReviewDate = (interval: number, reviewDate: string): any => {
    let reviewDateSample;
    if (Math.abs(interval) < 1) {
      const n = 24 * interval;
      if (Math.abs(n) < 1) {
        return this.findPreliminaryDate(
          reviewDate,
          'minute',
          +(60 * n).toFixed()
        );
        // return (60 * n).toFixed();
      }
      reviewDateSample = this.findPreliminaryDate(
        reviewDate,
        'hour',
        +n.toFixed()
      );
      const intervalDecimal = String(n).split('.').pop();
      if (!intervalDecimal) {
        return reviewDateSample;
      }
      return this.getNextReviewDate(
        Number(`0.${intervalDecimal}`) / 24,
        reviewDateSample
      );
    }

    reviewDateSample = this.findPreliminaryDate(
      reviewDate,
      'day',
      +interval.toFixed()
    );

    const intervalDecimal = String(interval).split('.').pop();

    if (!intervalDecimal) {
      return reviewDateSample;
    }
    return this.getNextReviewDate(+`0.${intervalDecimal}`, reviewDateSample);
  };

  // getNextReviewDate(actualReviewDate: string, interval: number) {}

  evaluate(previous: any, score: number, actualReviewDate: string) {
    let n, efactor, interval, plannedReviewDate;

    if (previous == null) {
      previous = {
        n: 0,
        efactor: 2.5,
        interval: 0.0,
        plannedReviewDate: actualReviewDate,
      };
    }

    const lateness = this.getReviewLateness(
      previous.plannedReviewDate,
      actualReviewDate,
      previous.interval
    );

    if (previous.n < 3) {
      // Still in learning phase, so do not change efactor
      efactor = previous.efactor;

      if (score < 3) {
        // Failed, so force re-review in 30 minutes and reset n count
        n = 0;
        interval = (30 * 1.0) / (24.0 * 60.0);
      } else {
        n = previous.n + 1;

        // first interval = 30min
        // second interval = 12h
        // third interval = 24h
        if (n == 1) {
          // in 30m
          interval = (30.0 * 1.0) / (24.0 * 60.0);
        } else if (n == 2) {
          // in 12h
          interval = 0.5;
        } else {
          // in 1d
          interval = 1.0;
        }
      }
      // Add 10% "fuzz" to interval to avoid bunching up reviews
      interval = interval * (1.0 + Math.random() * 0.1);
      plannedReviewDate = this.getNextReviewDate(interval, actualReviewDate);
    } else {
      // Reviewing phase

      if (score < 3) {
        // Failed, so force re-review in 30 minutes and reset n count
        n = 0;
        interval = (30 * 1.0) / (24.0 * 60.0);

        // Reduce efactor
        efactor = Math.max(1.3, previous.efactor - 0.2);
      } else {
        // Passed, so adjust efactor and compute interval

        // First see if this was done close to on time or late. We handle early reviews differently
        // because Fresh Cards allows you to review cards as many times as you'd like, outside of
        // the SRS schedule. See details below in the "early" section.

        if (lateness >= -0.1) {
          // Review was not too early, so handle normally

          n = previous.n + 1;

          let latenessScoreBonus = 0;
          let intervalAdjustment = 1.0;

          // If this review was done late and user still got it right, give a slight bonus to the score of up to 1.0.
          // This means if a card was hard to remember AND it was late, the efactor should be unchanged. On the other
          // hand, if the card was easy, we should bump up the efactor by even more than normal.
          if (lateness >= 0.1 && score >= 3.0) {
            // Lateness factor is a function of previous interval length. The longer
            // previous interval, the harder it is to get a lateness bonus.
            // This ranges from 0.0 to 1.0.
            let latenessFactor = Math.min(1.0, lateness);

            // Score factor can range from 1.0 to 1.5
            let scoreFactor = 1.0 + (score - 3.0) / 4.0;

            // Bonus can range from 0.0 to 1.0.
            latenessScoreBonus = 1.0 * latenessFactor * scoreFactor;
          } else {
            // Card wasn't late, so adjust differently

            if (score >= 3.0 && score < 4) {
              // hard card, so adjust interval slightly
              intervalAdjustment = 0.8;
            }
          }

          let adjustedScore = latenessScoreBonus + score;
          efactor = Math.max(
            1.3,
            previous.efactor +
              (0.1 - (5 - adjustedScore) * (0.08 + (5 - adjustedScore) * 0.02))
          );

          // Figure out interval. First review is in 1d, then 6d, then based on efactor and previous interval.
          if (previous.n == 0) {
            interval = 1;
          } else if (previous.n == 1) {
            interval = 6;
          } else {
            interval = Math.ceil(
              previous.interval * intervalAdjustment * efactor
            );
          }
        } else {
          // Card was reviewed "too early". Since Fresh Cards lets you review cards outside of the
          // SRS schedule, it takes a different approach to early reviews. It will not progress the SRS
          // schedule too quickly if you review early. If we didn't handle this case, what would happen
          // is if you review a card multiple times in the same day, it would progress the schedule and
          // might make the card due next in 30 days, which doesn't make sense. Just because you reviewed
          // it frequently doesn't mean you have committed to memory stronger. It still takes a few days
          // for it to sink it.

          // Therefore, what this section does is does a weighted average of the previous interval
          // with the interval in the future had you reviewed it on time instead of early. The weighting
          // function gives greater weight to the previous interval period if you review too early,
          // and as we approach the actual due date, we weight the next interval more. This ensures
          // we don't progress through the schedule too quickly if you review a card frequently.

          // Still increment the 'n' value as it really has no effect on 'reviewing stage' cards.
          n = previous.n + 1;

          // Figure out the weight for the previous and next intervals.
          // First, normalize the lateness factor into a range of 0.0 to 1.0 instead of -1.0 to 0.0
          // (which indicates how early the review is).
          const earliness = 1.0 + lateness;
          // min(e^(earlieness^2) - 1.0), 1.0) gives us a nice weighted curve. You can plot it on a
          // site like fooplot.com. As we get closer to the true deadline, the future is given more
          // weight.
          const futureWeight = Math.min(
            Math.exp(earliness * earliness) - 1.0,
            1.0
          );
          const currentWeight = 1.0 - futureWeight;

          // Next we take the score at this time and extrapolate what that score may be in the
          // future, using the weighting function. Essentially, if you reviewed 5.0 today, we will
          // decay that score down to a minimum of 3.0 in the future. Something easily remembered
          // now may not be easily remembered in the future.
          const predictedFutureScore =
            currentWeight * score + futureWeight * 3.0;

          // Compute the future efactor and interval using the future score
          const futureEfactor = Math.max(
            1.3,
            previous.efactor +
              (0.1 -
                (5 - predictedFutureScore) *
                  (0.08 + (5 - predictedFutureScore) * 0.02))
          );
          let futureInterval;

          // Figure out interval. First review is in 1d, then 6d, then based on efactor and previous interval.
          if (previous.n == 0) {
            futureInterval = 1;
          } else if (previous.n == 1) {
            futureInterval = 6;
          } else {
            futureInterval = Math.ceil(previous.interval * futureEfactor);
          }

          // Finally, combine the previous and next efactor and intervals
          efactor =
            previous.efactor * currentWeight + futureEfactor * futureWeight;
          interval =
            previous.interval * currentWeight + futureInterval * futureWeight;
        }

        // Add 5% "fuzz" to interval to avoid bunching up reviews
        interval = interval * (1.0 + Math.random() * 0.05);
        plannedReviewDate = this.getNextReviewDate(interval, actualReviewDate);
      }
    }

    return { n, efactor, interval, plannedReviewDate };
  }
}
