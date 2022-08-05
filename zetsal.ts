import Tesseract from 'tesseract.js';
import puppeteer from 'puppeteer';
import { customAlphabet } from 'nanoid';
import fs from 'fs';

const nanoid = customAlphabet('abcdefghijklmnopqrstuvwxyz1234567890', 16);
let username = nanoid(10);
let email = nanoid(8) + '@KiNpNAk4EDbyhp5RPsBxpEisR8.com';
let password = nanoid(16);

puppeteer1();

async function puppeteer1() {
  const browser =  await puppeteer.launch({
    headless: true,
    args: ['--no-sandbox']
  });
  const page = await browser.newPage();
  await page.goto('https://zetsal.com/register');
  await Promise.resolve()
    .then(() => (page.focus('#username')))
    .then(() => (page.keyboard.type(username)))
    .then(() => (page.focus('#email')))
    .then(() => (page.keyboard.type(email)))
    .then(() => (page.focus('#password')))
    .then(() => (page.keyboard.type(password)))
    .then(() => (page.focus('#password2')))
    .then(() => (page.keyboard.type(password)));
  let capimg = await page.waitForSelector('#cap');
  await capimg?.screenshot({ path: 'captcha.png' }).then(function(){captcha(page, browser)});
};

async function captcha(page: puppeteer.Page, browser: puppeteer.Browser) {
  Tesseract.recognize(
    './captcha.png',
    'eng',
  ).then(({ data: { text } }) => {
    puppeteer2(text, page, browser);
  });
};

async function puppeteer2(text: string, page: puppeteer.Page, browser: { close: () => any; }) {
  await Promise.resolve()
    .then(() => (page.focus('#captcha')))
    .then(() => (page.keyboard.type(text)))
    .then(() => (page.waitForSelector('#btn')))
    .then(() => (page.click('#btn')))
    .then(() => (page.waitForNavigation({waitUntil: ['load', 'networkidle2']})))
    .then(() => (page.focus('#username')))
    .then(() => (page.keyboard.type(username)))
    .then(() => (page.focus('#password')))
    .then(() => (page.keyboard.type(password)))
    .then(() => (page.waitForSelector('#btn')))
    .then(() => (page.click('#btn')))
    .then(() => (page.goto('https://zetsal.com/plans')))
    .then(() => (page.waitForSelector('body > .slim-mainpanel > .container > .alert > .btn')))
    .then(() => (page.click('body > .slim-mainpanel > .container > .alert > .btn')))
    .then(() => (browser.close()))
    .then(() => (fs.appendFile('./zetsal.txt', `${username}:${password}\n`, function(){console.log(`Zetsal VPNアカウントの作成が完了しました\nUsername:Password\n${username}:${password}`)})));
};
