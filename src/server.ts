import express from 'express';
import path from 'path';
import { chromium } from 'playwright';

const app = express();
const port = 3000;
const mobileNumber = '09999999999'
const email = "mlim@medgrocer.com"
app.use(express.json());

// Serve the index.html file
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.post('/run-tests', async (req, res) => {
    const { url } = req.body;

    const browser = await chromium.launch({ headless: false });
    const page = await browser.newPage();
    await page.goto('https:/bestlife.medgrocer.com/labs/member-details');
    // Add your test code here
    const title = await page.title();
    await page.getByPlaceholder('Juan', { exact: true }).fill('Test');

    await page.getByPlaceholder('Dela Cruz').fill('Test');

    await page.locator('input[name="mobileNumber"]').fill(mobileNumber);

    await page.getByPlaceholder('Acme Incorporated').click();
    await page.getByPlaceholder('Acme Incorporated').fill('TEST');
    await page.getByPlaceholder('jdelacruz@mail.com').click();
    await page.getByPlaceholder('jdelacruz@mail.com').fill(email);
    await page.getByPlaceholder('Juana Santos').click();
    await page.getByPlaceholder('Juana Santos').fill('TEST CONTACT');
    await page.locator('input[name="secondaryContactMobileNumber"]').click();
    await page.locator('input[name="secondaryContactMobileNumber"]').fill('09999999999');
    await page.locator('.react-select__indicator').first().click();
    await page.locator('.react-select__indicator').first().click();
    await page.keyboard.press('Enter');

    await page.locator('div').filter({ hasText: /^MMM$/ }).nth(1).click();
    await page.keyboard.press('Enter');

    await page.locator('div').filter({ hasText: /^DD$/ }).nth(1).click();
    await page.keyboard.press('Enter');
    await page.locator('label').filter({ hasText: /^Male$/ }).click();
    await page.getByPlaceholder('5678 4321 9876').click();
    await page.getByPlaceholder('5678 4321 9876').fill('1234 5678 9876 5432');
    await page.getByRole('button', { name: 'Next: Laboratory Tests' }).click();
    await page.locator('label').filter({ hasText: 'Primary Care Clinic' }).click();
    await page.locator('div').filter({ hasText: /^YYYYMMMDD$/ }).locator('svg').first().click();
    await page.keyboard.press('Enter');
    await page.getByRole('main').locator('svg').nth(1).click();
    await page.keyboard.press('Enter');
    await page.getByText('DD').click();
    await page.keyboard.press('Enter');
    await page.getByRole('button', { name: 'Next: Summary' }).click();
    await page.locator('label').filter({ hasText: 'I understand that I am' }).click();
    await page.waitForTimeout(3000);

    res.send("PLAYWRIGHT GOATED");
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
