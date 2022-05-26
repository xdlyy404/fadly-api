const fs = require("fs")
const axios = require('axios')
const cheerio = require('cheerio')
const request = require('request')
const qs = require("qs")
const fetch = require("node-fetch")
const FormData = require("form-data")
const { fromBuffer } = require('file-type')
const author = "Fadly ID"

const aiovideodl = async (url) => {
    return new Promise((resolve, reject) => {
        axios({url: 'https://aiovideodl.ml/',method: 'GET',headers: {"user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36","cookie": "PHPSESSID=3893d5f173e91261118a1d8b2dc985c3; _ga=GA1.2.792478743.1635388171;"}}).then((data) => {
            let a = cheerio.load(data.data)
            let token = a('#token').attr('value')
            const options = {
                method: 'POST',
                url: `https://aiovideodl.ml/wp-json/aio-dl/video-data/`,
                headers: {"content-type": "application/x-www-form-urlencoded; charset=UTF-8","user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36","cookie": "PHPSESSID=3893d5f173e91261118a1d8b2dc985c3; _ga=GA1.2.792478743.1635388171;"
                },
                formData: {url: url,token: token}
            };
            request(options, async function(error, response, body) {
                if (error) throw new Error(error)
                res = JSON.parse(body)
                res.status = 200
                res.author = author
                resolve(res);
            });
        })
    })
}

function fbdl(link){
    return new Promise((resolve,reject) => {
    let config = {
        'url': link
    }
    axios('https://www.getfvid.com/downloader',{
        method: 'POST',
        data: new URLSearchParams(Object.entries(config)),
        headers: {
            "content-type": "application/x-www-form-urlencoded",
            "user-agent":  "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36",
            "cookie": "_ga=GA1.2.1310699039.1624884412; _pbjs_userid_consent_data=3524755945110770; cto_bidid=rQH5Tl9NNm5IWFZsem00SVVuZGpEd21sWnp0WmhUeTZpRXdkWlRUOSUyQkYlMkJQQnJRSHVPZ3Fhb1R2UUFiTWJuVGlhVkN1TGM2anhDT1M1Qk0ydHlBb21LJTJGNkdCOWtZalRtZFlxJTJGa3FVTG1TaHlzdDRvJTNE; cto_bundle=g1Ka319NaThuSmh6UklyWm5vV2pkb3NYaUZMeWlHVUtDbVBmeldhNm5qVGVwWnJzSUElMkJXVDdORmU5VElvV2pXUTJhQ3owVWI5enE1WjJ4ZHR5NDZqd1hCZnVHVGZmOEd0eURzcSUyQkNDcHZsR0xJcTZaRFZEMDkzUk1xSmhYMlY0TTdUY0hpZm9NTk5GYXVxWjBJZTR0dE9rQmZ3JTNEJTNE; _gid=GA1.2.908874955.1625126838; __gads=ID=5be9d413ff899546-22e04a9e18ca0046:T=1625126836:RT=1625126836:S=ALNI_Ma0axY94aSdwMIg95hxZVZ-JGNT2w; cookieconsent_status=dismiss"
        }
    })
    .then(async({ data }) => {
        const $ = cheerio.load(data);    
        resolve({
            Normal_video: $('div.col-md-4.btns-download > p:nth-child(2) > a').attr('href'),
            HD: $('div.col-md-4.btns-download > p:nth-child(1) > a').attr('href'),
            audio: $('div.col-md-4.btns-download > p:nth-child(3) > a').attr('href')
            })
        })
    .catch(reject)
    })
}

function igdl(url) {
    return new Promise(async (resolve, reject) => {
        axios.request({
            url: 'https://www.instagramsave.com/download-instagram-videos.php',
            method: 'GET',
            headers: {
                "user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36",
                "cookie": "PHPSESSID=ugpgvu6fgc4592jh7ht9d18v49; _ga=GA1.2.1126798330.1625045680; _gid=GA1.2.1475525047.1625045680; __gads=ID=92b58ed9ed58d147-221917af11ca0021:T=1625045679:RT=1625045679:S=ALNI_MYnQToDW3kOUClBGEzULNjeyAqOtg"
            }
        })
        .then(({ data }) => {
            const $ = cheerio.load(data)
            const token = $('#token').attr('value')
            let config = {
                headers: {
                    'content-type': 'application/x-www-form-urlencoded; charset=UTF-8',
                    "sec-ch-ua": '" Not;A Brand";v="99", "Google Chrome";v="91", "Chromium";v="91"',
                    "cookie": "PHPSESSID=ugpgvu6fgc4592jh7ht9d18v49; _ga=GA1.2.1126798330.1625045680; _gid=GA1.2.1475525047.1625045680; __gads=ID=92b58ed9ed58d147-221917af11ca0021:T=1625045679:RT=1625045679:S=ALNI_MYnQToDW3kOUClBGEzULNjeyAqOtg",
                    "user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36",
                },
                data: {
                    'url': url,
                    'action': 'post',
                    'token': token
                }
            }
            axios.post('https://www.instagramsave.com/system/action.php', qs.stringify(config.data), { headers: config.headers })
            .then(({ data }) => {
                resolve(data)
            })
        })
        .catch(reject)
    })
}

const jadwalsholat = (query) => {
    return new Promise((resolve, reject) => {
        axios.get(`https://umrotix.com/jadwal-sholat/${query}`)
        .then(({
            data
        }) => {
            const $ = cheerio.load(data)
            $('body > div > div.main-wrapper.scrollspy-action > div:nth-child(3) ').each(function(a, b) {   
                result = {
                    status: 200,
                    author: author,
                    tanggal: $(b).find('> div:nth-child(2)').text(),
                    imsyak: $(b).find('> div.panel.daily > div > div > div > div > div:nth-child(1) > p:nth-child(2)').text(),
                    subuh: $(b).find('> div.panel.daily > div > div > div > div > div:nth-child(2) > p:nth-child(2)').text(),
                    dzuhur: $(b).find('> div.panel.daily > div > div > div > div > div:nth-child(3) > p:nth-child(2)').text(),
                    ashar: $(b).find('> div.panel.daily > div > div > div > div > div:nth-child(4) > p:nth-child(2)').text(),
                    maghrib: $(b).find('> div.panel.daily > div > div > div > div > div:nth-child(5) > p:nth-child(2)').text(),
                    isya: $(b).find('> div.panel.daily > div > div > div > div > div:nth-child(6) > p:nth-child(2)').text()
                }
                resolve(result)
            })
        })
        .catch(reject)
    })
}

const listsurah = () => {
    return new Promise((resolve, reject) => {
        axios.get('https://litequran.net/')
        .then(({ data }) => {
            const $ = cheerio.load(data)
            let listsurah = []
            $('body > main > section > ol > li > a').each(function(a, b) {
                listsurah.push($(b).text())
            })
            result = {
                status: 200,
                author: author,
                listsurah: listsurah
            }
            resolve(result)
        }).catch(reject)
    })
}

const surah = (query) => {
    return new Promise((resolve, reject) => {
        axios.get(`https://litequran.net/${query}`)
        .then(({
            data
        }) => {
            const $ = cheerio.load(data)
            const hasil = []
            $('body > main > article > ol > li').each(function(a, b) {
                result = {
                    status: 200,
                    author: author,
                    arab: $(b).find('> span.ayat').text(),
                    latin: $(b).find('> span.bacaan').text(),
                    translate: $(b).find('> span.arti').text()
                }
                hasil.push(result)
            })
            resolve(hasil)
        })
        .catch(reject)
    })
}

const tafsirsurah = (query) => {
    return new Promise((resolve, reject) => {
        axios.get(`https://tafsirq.com/topik/${query}`)
        .then(({
            data
        }) => {
            const $ = cheerio.load(data)
            const hasil = []
            $('body > div:nth-child(4) > div > div.col-md-6 > div ').each(function(a, b) {
                result = {
                    status: 200,
                    author: author,
                    surah: $(b).find('> div.panel-heading.panel-choco > div > div > a').text(),
                    tafsir: $(b).find('> div.panel-body.excerpt').text().trim(),
                    type: $(b).find('> div.panel-heading.panel-choco > div > div > span').text(),
                    source: $(b).find('> div.panel-heading.panel-choco > div > div > a').attr('href')
                }
                hasil.push(result)
            })
            resolve(hasil)
        })
        .catch(reject)
    })
}

function lirik(judul){
    return new Promise(async(resolve, reject) => {
        axios.get('https://www.musixmatch.com/search/' + judul)
        .then(async({ data }) => {
            const $ = cheerio.load(data)
            const hasil = {};
            let limk = 'https://www.musixmatch.com'
            const link = limk + $('div.media-card-body > div > h2').find('a').attr('href')
            await axios.get(link)
            .then(({ data }) => {
                const $$ = cheerio.load(data)
                hasil.thumb = 'https:' + $$('div.col-sm-1.col-md-2.col-ml-3.col-lg-3.static-position > div > div > div').find('img').attr('src')
                $$('div.col-sm-10.col-md-8.col-ml-6.col-lg-6 > div.mxm-lyrics').each(function(a,b) {
                    hasil.lirik = $$(b).find('span > p > span').text() +'\n' + $$(b).find('span > div > p > span').text()
                })
            })
            resolve(hasil)
        })
        .catch(reject)
    })
}

async function photooxy(url, text) {
    if (!/^https:\/\/photooxy\.com\/.+\.html$/.test(url))
        throw new Error("Invalid URL");
    let nomor = 0;
    const form = new FormData();
    if (typeof text === "string") text = [text];
    for (let texts of text) {
        nomor += 1;
        form.append(`text_${nomor}`, texts);
    }
    form.append("login", "OK");
    let cari = await fetch(url, {
        method: "POST",
        headers: {
            Accept: "/",
            "Accept-Language": "en-US,en;q=0.9",
            "User-Agent": "GoogleBot",
            ...form.getHeaders(),
        },
        body: form.getBuffer(),
    });
    let html = await cari.text();
    let $ = cheerio.load(html);
    const hasil = $('a[class="btn btn-primary"]').attr("href");
    return hasil;
}

async function pinterest(query) {
    return new Promise((resolve, reject) => {
        let err = { status: 404, message: "Terjadi kesalahan" }
        gis({ searchTerm: query + ' site:id.pinterest.com', }, (er, res) => {
            if (er) return err
            let hasil = {
                status: 200,
                author: author,
                result: []
            }
            res.forEach(x => hasil.result.push(x.url))
            resolve(hasil)
        })
    })
}

const stickersearch = (query) => {
    return new Promise((resolve, reject) => {
        axios.get(`https://getstickerpack.com/stickers?query=${query}`)
        .then(({
            data
        }) => {
            const $ = cheerio.load(data)
            const source = [];
            const link = [];
            $('#stickerPacks > div > div:nth-child(3) > div > a').each(function(a, b) {
                source.push($(b).attr('href'))
            })
            axios.get(source[Math.floor(Math.random() * source.length)])
            .then(({
                data
            }) => {
                const $$ = cheerio.load(data)
                $$('#stickerPack > div > div.row > div > img').each(function(c, d) {
                    link.push($$(d).attr('src').replace(/&d=200x200/g,''))
                })
                result = {
                    status: 200,
                    author: author,
                    title: $$('#intro > div > div > h1').text(),
                    sticker_url: link
                }
                resolve(result)
            })
        }).catch(reject)
    })
}

async function shopee(item, limit) {
    const hasil = []
    await axios.request(`https://shopee.co.id/api/v4/search/search_items?by=relevancy&keyword=${item}&limit=${limit}&newest=0&order=desc&page_type=search&scenario=PAGE_GLOBAL_SEARCH&version=2`, {
        method: "GET",
        data: null,
        headers: {
            "accept": "*/*",
            "accept-language": "en-US,en;q=0.9,id;q=0.8",
            "if-none-match-": "55b03-856cd63f16112f8a43da6096f97ac3fe",
            "sec-ch-ua": "\" Not A;Brand\";v=\"99\", \"Chromium\";v=\"90\", \"Google Chrome\";v=\"90\"",
        }
    }).then(respon => {
        hasil.push(respon.data)
    })
    return hasil[0]
}

async function telesticker(url) {
   url = url.replace('https://t.me/addstickers/', '')
   var data1 = await axios.get(`https://api.telegram.org/bot891038791:AAHWB1dQd-vi0IbH2NjKYUk-hqQ8rQuzPD4/getStickerSet?name=${encodeURIComponent(url)}`)
   const result = []
   for (let i of data1.data.result.stickers) {
       var data2 = await axios.get(`https://api.telegram.org/bot891038791:AAHWB1dQd-vi0IbH2NjKYUk-hqQ8rQuzPD4/getFile?file_id=${i.thumb.file_id}`)
       var link = data2.data.result.file_path
       var has = `https://api.telegram.org/file/bot891038791:AAHWB1dQd-vi0IbH2NjKYUk-hqQ8rQuzPD4/${link}`
       result.push({ status: data2.status, url: has })
   }
  return result
}

async function TiktokDownloader (Url) {
    return new Promise (async (resolve, reject) => {
        await axios.request({
            url: "https://ttdownloader.com/",
            method: "GET",
            headers: {
                "accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9",
                "accept-language": "en-US,en;q=0.9,id;q=0.8",
                "user-agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_13_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/67.0.3396.99 Safari/537.36",
                "cookie": "_ga=GA1.2.1240046717.1620835673; PHPSESSID=i14curq5t8omcljj1hlle52762; popCookie=1; _gid=GA1.2.1936694796.1623913934"
            }
        }).then(respon => {
            const $ = cheerio.load(respon.data)
            const token = $('#token').attr('value')
            axios({
                url: "https://ttdownloader.com/req/",
                method: "POST",
                data: new URLSearchParams(Object.entries({url: Url, format: "", token: token})),
                headers: {
                    "accept": "*/*",
                    "accept-language": "en-US,en;q=0.9,id;q=0.8",
                    "content-type": "application/x-www-form-urlencoded; charset=UTF-8",
                    "user-agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_13_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/67.0.3396.99 Safari/537.36",
                    "cookie": "_ga=GA1.2.1240046717.1620835673; PHPSESSID=i14curq5t8omcljj1hlle52762; popCookie=1; _gid=GA1.2.1936694796.1623913934"
                }
            }).then(res => {
                const ch = cheerio.load(res.data)
                const result = {
                    status: res.status,
                    result: {
                        nowatermark: ch('#results-list > div:nth-child(2)').find('div.download > a').attr('href'),
                        watermark: ch('#results-list > div:nth-child(3)').find('div.download > a').attr('href'),
                        audio: ch('#results-list > div:nth-child(4)').find(' div.download > a').attr('href')
                    }
                }
                resolve(result)
            }).catch(reject)
        }).catch(reject)
    })
}

function TelegraPh (Path) {
    return new Promise (async (resolve, reject) => {
        if (!fs.existsSync(Path)) return reject(new Error("File not Found"))
        try {
            const form = new FormData();
            form.append("file", fs.createReadStream(Path))
            const data = await  axios({
                url: "https://telegra.ph/upload",
                method: "POST",
                headers: {
                    ...form.getHeaders()
                },
                data: form
            })
            return resolve("https://telegra.ph" + data.data[0].src)
        } catch (err) {
            return reject(new Error(String(err)))
        }
    })
}

async function UploadFileUgu (input) {
    return new Promise (async (resolve, reject) => {
        const form = new FormData();
        form.append("files[]", fs.createReadStream(input))
        await axios({
            url: "https://uguu.se/upload.php",
            method: "POST",
            headers: {
                "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/90.0.4430.212 Safari/537.36",
                ...form.getHeaders()
            },
            data: form
        }).then((data) => {
            resolve(data.data.files[0])
        }).catch((err) => reject(err))
    })
}

function webp2mp4File(path) {
    return new Promise((resolve, reject) => {
        const form = new FormData()
        form.append('new-image-url', '')
        form.append('new-image', fs.createReadStream(path))
        axios({
            method: 'post',
            url: 'https://s6.ezgif.com/webp-to-mp4',
            data: form,
            headers: {
                'Content-Type': `multipart/form-data; boundary=${form._boundary}`
            }
        }).then(({ data }) => {
            const bodyFormThen = new FormData()
            const $ = cheerio.load(data)
            const file = $('input[name="file"]').attr('value')
            bodyFormThen.append('file', file)
            bodyFormThen.append('convert', "Convert WebP to MP4!")
            axios({
                method: 'post',
                url: 'https://ezgif.com/webp-to-mp4/' + file,
                data: bodyFormThen,
                headers: {
                    'Content-Type': `multipart/form-data; boundary=${bodyFormThen._boundary}`
                }
            }).then(({ data }) => {
                const $ = cheerio.load(data)
                const result = 'https:' + $('div#output > p.outfile > video > source').attr('src')
                resolve({
                    status: true,
                    message: "Created By Fadly ID",
                    result: result
                })
            }).catch(reject)
        }).catch(reject)
    })
}

function ytdl(link){
    return new Promise((resolve, reject) => {
        const ytIdRegex = /(?:http(?:s|):\/\/|)(?:(?:www\.|)youtube(?:\-nocookie|)\.com\/(?:watch\?.*(?:|\&)v=|embed\/|v\/)|youtu\.be\/)([-_0-9A-Za-z]{11})/
        if (ytIdRegex.test(link)) {
        let url =  ytIdRegex.exec(link)
        let config = {
            'url': 'https://www.youtube.be/' + url,
            'q_auto': 0,
            'ajax': 1
        }
        let headerss =     {
            "sec-ch-ua": '" Not;A Brand";v="99", "Google Chrome";v="91", "Chromium";v="91"',
            "user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36",
            "Cookie": 'PHPSESSID=6jo2ggb63g5mjvgj45f612ogt7; _ga=GA1.2.405896420.1625200423; _gid=GA1.2.2135261581.1625200423; _PN_SBSCRBR_FALLBACK_DENIED=1625200785624; MarketGidStorage={"0":{},"C702514":{"page":5,"time":1625200846733}}'
        }
    axios('https://www.y2mate.com/mates/en68/analyze/ajax',{
    method: 'POST',
        data: new URLSearchParams(Object.entries(config)),
        headers: headerss
    })
    .then(({ data }) => {
        const $ = cheerio.load(data.result)
        let img = $('div.thumbnail.cover > a > img').attr('src');
        let title = $('div.thumbnail.cover > div > b').text();
        let size = $('#mp4 > table > tbody > tr:nth-child(3) > td:nth-child(2)').text()
        let size_mp3 = $('#audio > table > tbody > tr:nth-child(1) > td:nth-child(2)').text()
        let id = /var k__id = "(.*?)"/.exec(data.result)[1]
        let configs = {
            type: 'youtube',
            _id: id,
            v_id: url[1],
            ajax: '1',
            token: '',
            ftype: 'mp4',
            fquality: 480
        }
        axios('https://www.y2mate.com/mates/en68/convert',{
            method: 'POST',
            data: new URLSearchParams(Object.entries(configs)),
            headers: headerss 
        })
        .then(({data}) => {
            const $ = cheerio.load(data.result)
            let link = $('div > a').attr('href')
            let configss = {
                type: 'youtube',
                _id: id,
                v_id: url[1],
                ajax: '1',
                token: '',
                ftype: 'mp3',
                fquality: 128
            }
            axios('https://www.y2mate.com/mates/en68/convert',{
                method: 'POST',
                data: new URLSearchParams(Object.entries(configss)),
                headers: headerss 
            })
            .then(({ data }) => {
            const $ = cheerio.load(data.result)
            let audio = $('div > a').attr('href')
            resolve({
                id: url[1],
                title: title,
                size: size,
                quality: '480p',
                thumb: img,
                link: link,
                size_mp3: size_mp3,
                mp3: audio
            })
            })
        })
    })
    .catch(reject)
    }else reject('link invalid')
    })
}

module.exports.aiovideodl = aiovideodl
module.exports.fbdl = facebook
module.exports.igdl = instagram
module.exports.ytdl = youtube
module.exports.TiktokDownloader = tiktok
module.exports.jadwalsholat = jadwalsholat
module.exports.listsurah = listsurah
module.exports.surah = surah
module.exports.tafsirsurah = tafsirsurah
module.exports.lirik = liriklagu
module.exports.photooxy = photooxy
module.exports.pinterest = pinterest
module.exports.stickersearch = stickersearch
module.exports.shopee = shopee
module.exports.telesticker = telesticker
module.exports.TelegraPh = TelegraPh
module.exports.UploadFileUgu = UploadFileUgu
module.exports.webp2mp4File = webp2mp4File