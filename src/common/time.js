const SECS_PER_DAY = 24 * 3600;
const SECS_PER_HOUR = 3600;
const SECS_PER_MINUTE = 60;

const formatTime = (time) => {
  return time > 9 ? '' + time : '0' + time;
}

export default {
  /**
   * 时间格式化
   * @param  {Int} time 待格式化的时间毫秒数
   * @return {Object}   格式化后数据
   */
  format(time) {
    time = time > 0 ? time : 0;

    const totalSec = Math.floor(time / 1000);
    let leftSec = totalSec;
    const day = Math.floor(leftSec / SECS_PER_DAY);
    leftSec = totalSec - day * SECS_PER_DAY;

    const hour = Math.floor(leftSec / SECS_PER_HOUR);
    leftSec -= hour * SECS_PER_HOUR;

    const minute = Math.floor(leftSec / SECS_PER_MINUTE);
    leftSec -= minute * SECS_PER_MINUTE;

    const second = leftSec;

    const millisecond =
      time - (day * SECS_PER_DAY + hour * SECS_PER_HOUR + minute * SECS_PER_MINUTE + second) * 1000;

    return {
      data: {
        day,
        hour,
        minute,
        second,
        millisecond
      },
      strData: {
        day: formatTime(day),
        hour: formatTime(hour),
        minute: formatTime(minute),
        second: formatTime(second),
        millisecond: formatTime(millisecond)
      }
    };
  },

  /**
   * 格式化月份
   * @param {Number} month
   */
  formatMonthWithZero(month) {
    month = month + 1 < 10 ? '0' + (month + 1) : month + 1;
    return month;
  },

  /**
   * 格式化天
   * @param {Number} day
   */
  formatDayWithZero(day) {
    day = day < 10 ? '0' + day : day;
    return day;
  },

  /**
   * 时间戳解析
   * @param {Number} timeStamp 时间戳
   */
  formatDate(timeStamp) {
    const date = new Date(timeStamp);

    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const hour = date.getHours();
    const minute = date.getMinutes();
    const second = date.getSeconds();

    return {
      data: {
        year,
        month,
        day,
        hour,
        minute,
        second
      },

      strData: {
        year,
        month: formatTime(month),
        day: formatTime(day),
        hour: formatTime(hour),
        minute: formatTime(minute),
        second: formatTime(second)
      }
    };
  },

  // 获取非当年描述
  getOtherYearDesc(date) {
    return `${date.year}-${date.month}-${date.day}`;
  },

  // 获取非当月描述
  getOtherMonthDesc(date) {
    return `${date.month}-${date.day}`;
  },

  // 获取非当天描述
  getOtherDayDesc(date, diffDay) {
    let result = '';

    switch (diffDay) {
      case 1:
        result = '昨天';
        break;
      default:
        result = this.getOtherMonthDesc(date);
        break;
    }

    return result;
  },

  // 获取当天描述
  getToDayDesc(diffMinute) {
    let result = '';

    if (diffMinute > 59) {
      result = '今天';
    } else if (diffMinute > 0) {
      result = `${diffMinute}分钟前`;
    } else {
      result = '刚刚';
    }

    return result;
  },

  /**
   * 距离当前时间的粗略描述
   * @param  {Number} timeStamp 时间戳
   */
  getDateDesc(timeStamp) {
    let result = '';
    const oldDate = this.formatDate(timeStamp);
    const currDate = this.formatDate(new Date().getTime());

    if (currDate.data.year > oldDate.data.year) {
      result = this.getOtherYearDesc(oldDate.strData);
    } else if (currDate.data.month > oldDate.data.month) {
      result = this.getOtherMonthDesc(oldDate.strData);
    } else if (currDate.data.day > oldDate.data.day) {
      const diffDay = currDate.data.day - oldDate.data.day;

      result = this.getOtherDayDesc(oldDate.strData, diffDay);
    } else {
      const diffMinute =
        currDate.data.hour * 60 +
        currDate.data.minute -
        (oldDate.data.hour * 60 + oldDate.data.minute);

      result = this.getToDayDesc(diffMinute);
    }

    return result;
  }
};
