# D&D Azure Hosting Quote Generator

A responsive web application that allows prospective clients to receive detailed Azure hosting quotes based on their firm size.

## Features

- **User Input Collection**: Collects firm name and number of users
- **Tier-Based Pricing**: Determines appropriate hosting plan based on user count
  - Tier 1 (1-10 users): B2MS hosting plan
  - Tier 2 (11-20 users): B4MS hosting plan
  - For more than 20 users: Displays contact information for the Senior Technical Consultant
- **Toggle-Based Payment Options**: Each plan (1-year and 3-year) includes a toggle to switch between Monthly and Upfront payment options
- **Detailed Resource Information**: Shows descriptions for each Azure resource included in the plan
- **Responsive Design**: Optimized for both desktop and mobile devices
- **Input Validation**: Ensures user inputs are valid before generating quotes

## Technologies Used

- HTML5
- CSS3 (with responsive design using media queries)
- Vanilla JavaScript (no frameworks)

## How to Use

1. Open `index.html` in a web browser
2. Enter your firm name and number of users
   - For 1-10 users: B2MS hosting plan quotes will be displayed
   - For 11-20 users: B4MS hosting plan quotes will be displayed
   - For more than 20 users: Contact information for the Senior Technical Consultant will be displayed
3. Click "Generate Quote" to see your Azure hosting options
4. Review the two plan options:
   - 1-Year Reserved
   - 3-Year Reserved
5. Use the toggle switch on each plan to view Monthly or Upfront payment options
6. Each plan shows the resources included and the total cost
7. Click "Select This Plan" on your preferred option

## Project Structure

- `index.html` - Main HTML structure
- `styles.css` - CSS styling for the application
- `script.js` - JavaScript for form handling and quote generation
- `microsoft-azure-logo.png` - Azure logo image
- `d&d logo.webp` - D&D logo image

## Pricing Information

The pricing used in this application is based on the provided Azure pricing tables (in ZAR):

### B2MS Plans (Tier 1: 1-10 users)

- **1 Year Reserved – Monthly**: R2,941.95/month, R0 upfront
- **1 Year Reserved – Upfront**: R2,073.70/month, R10,419.19 upfront
- **3 Year Reserved – Monthly**: R2,628.80/month, R0 upfront
- **3 Year Reserved – Upfront**: R2,073.70/month, R19,981.33 upfront

### B4MS Plans (Tier 2: 11-20 users)

- **1 Year Reserved – Monthly**: R4,693.55/month, R0 upfront
- **1 Year Reserved – Upfront**: R2,966.18/month, R20,727.49 upfront
- **3 Year Reserved – Monthly**: R4,076.20/month, R0 upfront
- **3 Year Reserved – Upfront**: R2,966.18/month, R39,962.67 upfront

### Enterprise Solutions (More than 20 users)

For firms with more than 20 users, please contact the Senior Technical Consultant of Hosting Operations at aubrey.zemba@dyedurham.com for a customized enterprise-level quote.

## License

This project is open source and available for use and modification. 
