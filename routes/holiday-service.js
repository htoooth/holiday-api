const cheerio = require('cheerio')
const phantom = require('phantom')

const END_POINT = 'http://www.baidu.com/s'

function sleep(s) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve()
    }, s * 1000)
  })
}

async function getHtml(url) {
  const instance = await phantom.create();
  const page = await instance.createPage();
  const status = await page.open(url);
  const content = await page.property('content');
  await instance.exit();
  return content
}

async function query(year, month, day) {
  const newDate = `${year}年${month}月${day}日`;
  const url = `${END_POINT}?wd=${encodeURIComponent(newDate)}`;

  const html = await getHtml(url);
  const $ = cheerio.load(html);
  const today = $('.op-calendar-new').find('.op-calendar-new-table-selected');

  let shouldWork = true;

  const shouldRest = today.hasClass('op-calendar-new-table-weekend');
  const mustWork = today.hasClass('op-calendar-new-table-work');
  const mustRest = today.hasClass('op-calendar-new-table-rest');

  if (shouldRest) {
    shouldWork = false;
  }

  if (mustWork) {
    shouldWork = true;
  }

  if (mustRest) {
    shouldWork = false;
  }

  return {
    error: null,
    result: {
      shoudWork: shouldWork ? 'Y':'N'
    }
  }
}

module.exports = {
  query
}