export class RelativeTime {
  static inMinutes(date: string) {
    var delta = Math.round((+new Date() - Date.parse(new Date(date).toISOString())) / 1000);

    return Math.floor(delta / 60);
  }

  static fromNowOn(date: string) {
    var delta = Math.round((+new Date() - Date.parse(new Date(date).toISOString())) / 1000);

    var minute = 60,
        hour = minute * 60,
        day = hour * 24,
        week = day * 7;

    var fuzzy;

    if (delta < minute) {
        fuzzy = 'только что';
    } else if (Math.floor(delta / minute) == 1) {
        fuzzy = '1 минуту назад';
    } else if (Math.floor(delta / minute) < 5) {
        fuzzy = Math.floor(delta / minute) + ' минуты назад';
    } else if (delta < hour) {
        fuzzy = Math.floor(delta / minute) + ' минут назад';
    } else if (Math.floor(delta / hour) == 1) {
        fuzzy = '1 час назад'
    } else if (delta < day) {
        fuzzy = 'Сегодня';
    } else if (delta < day * 2) {
        fuzzy = 'Вчера';
    } else {
        fuzzy = Math.floor(delta / day) + ' дней назад';
    }

    return fuzzy;
  }
}
