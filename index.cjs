const PORT = 8000
const express = require('express')
const app = express()


const puppeteer = require('puppeteer');
const fs = require('fs');

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  next();
});

app.get('/', (req, res) => {
  res.json("Running Script !")
  runSript()
})

// {headless: false}

const getData = (async (link, name) => {
	const browser = await puppeteer.launch();
	const page = await browser.newPage();
	await page.goto(link);

  const getManga = await page.evaluate(() => {
    const nodeList = document.querySelectorAll("div.eplister li")
    const img = document.getElementsByClassName("attachment- size- wp-post-image")[0].currentSrc
    const title = document.getElementsByClassName("entry-title")[0].innerText

    const getManga = {
      name: title,
      chapter: nodeList[0].outerText,
      link: nodeList[0].querySelectorAll("a")[0].href,
      img
    }

    return getManga
  })

  name = name.split(" ").join("")

  fs.writeFile(`${name}.json`, JSON.stringify(getManga, null, 2), err => {
    if(err) throw new Error(`${name} error!`)

    console.log(`${name} success!`)
  })

  await browser.close()

});


const runSript = () => {
  const mangasLuminous = [{
    link: 'https://luminousscans.com/series/1669139749-mercenary-enrollment/',
    name: 'Mercenary Enrollment'
  },
  {
    link: 'https://luminousscans.com/series/1669139749-peerless-dad/',
    name: 'Peerless Dad'
  },
  {
    link: 'https://luminousscans.com/series/1669509973-mookhyang-dark-lady-isekai/',
    name: 'Mookhyang Dark Lady Isekai'
  }]

  mangasLuminous.forEach(manga => {
    getData(manga.link, manga.name)
  })
};

app.listen(PORT, () => { console.log(`Server is running in PORT ${PORT}`)})

