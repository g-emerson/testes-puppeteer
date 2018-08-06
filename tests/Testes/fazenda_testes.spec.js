import faker from "faker";
import puppeteer from "puppeteer";
import Fazenda_cadastro from '../Pages/fazenda_cadastro_page.js';
import Fazenda_lista from '../Pages/fazenda_lista_page.js';
import Home_Page from '../Pages/home_page.js';

const APP = "localhost:4200";

let page;
let browser;
const width = 1360;
const height = 768;

beforeAll(async() => {
    browser = await puppeteer.launch({
        headless: false,
        //slowMo: 80,
        args: [`--window-size=${width},${height}`]
    });
    page = await browser.newPage();
    await page.setViewport({ width, height });
    await page.goto('http://localhost:4200/');

});
afterAll(() => {
    // browser.close();
});


test('cadastrar-com-sucesso', async() => {
    // await page.screenshot({ path: 'tela-inicial.png', fullPage: true });
    //await page.click('body > app-root > app-nav > mat-toolbar > mat-toolbar-row > a');
    await page.click(Home_Page.btn_Fazenda);

    // await page.waitFor('#btn_add');
    await page.waitFor(Fazenda_lista.btn_add);
    await page.click(Fazenda_lista.btn_add);

    await page.type(Fazenda_cadastro.nome, 'Fazenda nome Cadastro');
    await page.click(Fazenda_cadastro.nomeReduzido);
    await page.type(Fazenda_cadastro.nomeReduzido, 'Faz reduzido');
    await page.type(Fazenda_cadastro.descricao, 'Descrição da Fazenda');
    await page.type(Fazenda_cadastro.cidade, 'Cidade');
    await page.type(Fazenda_cadastro.estado, 'UF');

    await page.click(Fazenda_cadastro.btn_salvar);

    //verificar ser foi salvo
    //await page.type("input[name='pesquisa']", 'Fazenda nome Cadastro');
    await page.type(Fazenda_lista.txt_pesquisa, 'Fazenda nome Cadastro');
    // await page.waitFor('body > app-root > app-lista-fazendas > div > div.container-tabela > mat-table > mat-row > mat-cell.mat-cell.cdk-column-nome.mat-column-nome.ng-star-inserted');
    await page.waitFor(Fazenda_lista.campo_nome);
    const achou = await page.$eval(Fazenda_lista.campo_nome,
        (element) => {
            return element.innerHTML
        })
    expect(achou).toBe(" Fazenda nome Cadastro ");

    //await page.click("button[class='excluir mat-icon-button']");
    await page.click(Fazenda_lista.btn_excluir);
    //await page.click("#btn_confirmar");
    await page.click(Fazenda_lista.btn_Alert_confirma)

}), 20000;