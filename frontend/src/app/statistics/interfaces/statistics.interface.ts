interface DateStatistics {
  learnedTotal: number
  learnedNew: number

}

export interface Statistics {
  learnedWords: number,
  optional?: {
    longestStreak: number,
    averagePerDay: number,
    trainingDates: Record<string, DateStatistics>
  }
}
