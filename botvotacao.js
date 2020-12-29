const puppeteer = require('puppeteer')
const readline = require('readline')

function abreLink() { 
  //criar input
  var read = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  })

  //pegar os dados do usuario
  read.question('Por favor digite seu nome de usuario: ', (answer) => {
    usr = answer
    read.question('Sua senha: ', (senha) =>{
      passwd = senha    
      read.question('Url do site do sorteio: ', (url) =>{
        urlsite = url
        read.question('Palavra que vai ser digitada: ', (word1) =>{
            keyword = word1
            read.question('Quantas vezes você quer que o bot comente: ', (numbot) =>{
              numBot = numbot              
              read.close(); 

              (async () => {
                //abrir navegador
                const browser = await puppeteer.launch({headless:false});
                const page = await browser.newPage();
                //ir no login do instagram 
              
                await page.goto('https://www.instagram.com/');
                //fazer login
                console.log('Fazendo Login')
                await page.waitForSelector('._2hvTZ.pexuQ.zyHYP')
                await page.type('._2hvTZ.pexuQ.zyHYP', usr,{delay:100})
                await page.type('input[name="password"]', passwd, {delay:100})
                await page.click('.sqdOP.L3NKy.y3zKF')
                console.log('Logado com sucesso')
                await page.waitForNavigation()

                //ir pra pagina do sorteio
                console.log('Redirecionando pra pagina do sorteio...')
                await page.goto(`${urlsite}`)

                //comentar 
                //loop
                execbot = 0
                console.log('Comentando...')
                while(execbot <= numBot){
                  await page.type('textarea.Ypffh', keyword,{delay:100})
                  await page.waitForSelector('.sqdOP.yWX7d.y3zKF')
                  await page.click('form.X7cDz button.sqdOP.yWX7d.y3zKF')
                  execbot++
                  if(numBot >= '60'){
                    await page.waitForTimeout(20000)
                  }else{
                    await page.waitForTimeout(7000)
                  }
                }
                console.log('Comentarios finalizados')
                console.log('Fechando Bot')
                await browser.close();
                console.log('Até mais!')
              })();
            })
        })
      })    
    })  
  })
        
}
 
//https://www.instagram.com/p/CJL1BIslbM-/
abreLink()


