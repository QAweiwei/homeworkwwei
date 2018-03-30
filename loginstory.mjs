//loginstory.mjs
import Story from "./story.mjs";
import webdriver from 'selenium-webdriver';

let given = "Given: open login page";
let when1 = "When: enter user name [admin]";
let when2 = "When: enter password [taylor2018]";
let then  = "Then: [successful!]";


export default class Loginstory extends Story{
    constructor(content){
        super(content);
        this._username = "";
        this._password = "";
        this._expected = "";
        this._actual = "";
    }
    
    //get username & password
    When(content){
        this._username = when1.substring(when1.indexOf("[")+1,when1.indexOf("]"));
        this._password = when2.substring(when2.indexOf("[")+1,when2.indexOf("]"));
    }

    //Automate testing by webdriver
    Then(content){
        this._expected = then.substr(then.indexOf("[")+1,1).toUpperCase() + then.substring(then.indexOf("[")+2,then.indexOf("]"));
        
        let driver = new webdriver.Builder().forBrowser("chrome").build();
        const login_url = "https://everdoc.github.io/hellojs/quize/login.html";
        driver.get(login_url); 
        driver.wait(webdriver.until.urlIs(login_url), 1000*30).then((success)=>{
            driver.findElement(webdriver.By.id('name')).sendKeys(this._username);
            driver.findElement(webdriver.By.id('password')).sendKeys(this._password);
            driver.findElement(webdriver.By.tagName('button')).click();
            driver.findElement(webdriver.By.id('result')).getText().then(
                (text)=>{
                    this._actual = text;
                    if(this._expected === this._actual)console.log('The case is PASS.');
                    else console.log('The case is FALL.');
                    driver.quit();
                }
            );        
            }, (reason)=>{
                console.log(reason);
                driver.quit();
            });
    }
}

let arrStory=[given,when1,when2,then];
let loginstory=new Loginstory(arrStory);
loginstory.Play();
