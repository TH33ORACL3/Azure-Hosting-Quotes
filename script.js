document.addEventListener('DOMContentLoaded', function() {
    // Get DOM elements
    const quoteForm = document.getElementById('quoteForm');
    const quoteResults = document.getElementById('quoteResults');
    const userCountError = document.getElementById('userCountError');
    const oneYearToggle = document.getElementById('oneYearToggle');
    const threeYearToggle = document.getElementById('threeYearToggle');
    const oneYearUpfrontNotice = document.getElementById('oneYearUpfrontNotice');
    const threeYearUpfrontNotice = document.getElementById('threeYearUpfrontNotice');
    
    // Resource descriptions
    const resourceDescriptions = {
        vm: "Host your applications with scalable virtual machines",
        vpnGateway: "Secure VPN connection to your on-premises network",
        managedDisks: "High-performance storage for VM data",
        virtualNetwork: "Private Azure network for your resources",
        azureBackup: "Automated backup for data protection"
    };
    
    // Simplified pricing data for both tiers (in ZAR)
    const pricingData = {
        tier1: { // B2MS (1-10 users)
            oneYearMonthly: {
                total: { monthly: 2999, upfront: 0 }
            },
            oneYearUpfront: {
                total: { monthly: 1999, upfront: 10499 }
            },
            threeYearMonthly: {
                total: { monthly: 2699, upfront: 0 }
            },
            threeYearUpfront: {
                total: { monthly: 1999, upfront: 19899 }
            }
        },
        tier2: { // B4MS (11-20 users)
            oneYearMonthly: {
                total: { monthly: 4699, upfront: 0 }
            },
            oneYearUpfront: {
                total: { monthly: 2999, upfront: 20599 }
            },
            threeYearMonthly: {
                total: { monthly: 3999, upfront: 0 }
            },
            threeYearUpfront: {
                total: { monthly: 2999, upfront: 39699 }
            }
        }
    };

    // Format currency (ZAR only)
    function formatCurrency(amount) {
        return amount === 0 ? 'R0.00' : `R${amount.toFixed(2)}`;
    }

    // Update pricing information
    function updatePricing(tier) {
        // Get all pricing values
        const oneYearMonthlyTotal = pricingData[tier].oneYearMonthly.total.monthly;
        const oneYearMonthlyUpfront = pricingData[tier].oneYearMonthly.total.upfront;
        const oneYearUpfrontMonthly = pricingData[tier].oneYearUpfront.total.monthly;
        const oneYearUpfrontTotal = pricingData[tier].oneYearUpfront.total.upfront;
        const threeYearMonthlyTotal = pricingData[tier].threeYearMonthly.total.monthly;
        const threeYearMonthlyUpfront = pricingData[tier].threeYearMonthly.total.upfront;
        const threeYearUpfrontMonthly = pricingData[tier].threeYearUpfront.total.monthly;
        const threeYearUpfrontTotal = pricingData[tier].threeYearUpfront.total.upfront;
        
        // Format and display prices
        document.getElementById('oneYearMonthlyTotal').textContent = formatCurrency(oneYearMonthlyTotal);
        document.getElementById('oneYearMonthlyUpfront').textContent = formatCurrency(oneYearMonthlyUpfront);
        document.getElementById('oneYearUpfrontMonthly').textContent = formatCurrency(oneYearUpfrontMonthly);
        document.getElementById('oneYearUpfrontTotal').textContent = formatCurrency(oneYearUpfrontTotal);
        document.getElementById('threeYearMonthlyTotal').textContent = formatCurrency(threeYearMonthlyTotal);
        document.getElementById('threeYearMonthlyUpfront').textContent = formatCurrency(threeYearMonthlyUpfront);
        document.getElementById('threeYearUpfrontMonthly').textContent = formatCurrency(threeYearUpfrontMonthly);
        document.getElementById('threeYearUpfrontTotal').textContent = formatCurrency(threeYearUpfrontTotal);
    }
    
    // Form validation and submission
    quoteForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form values
        const firmName = document.getElementById('firmName').value.trim();
        const userRange = document.querySelector('input[name="userCount"]:checked')?.value;
        
        // Validate selection
        if (!userRange) {
            userCountError.textContent = 'Please select a user range';
            return;
        } else {
            userCountError.textContent = '';
        }
        
        if (userRange === 'enterprise') {
            // For enterprise users, show contact message
            showContactMessage(firmName);
            return;
        }
        
        // Generate and display quote
        generateQuote(firmName, userRange);
    });
    
    // Show contact message for large firms
    function showContactMessage(firmName) {
        // Clear any previous results
        document.getElementById('thankYouMessage').textContent = `Thank you, ${firmName}!`;
        document.getElementById('tierInfo').innerHTML = 
            `<p>For firms with more than 20 users, please contact our Senior Technical Consultant of Hosting Operations:</p>
             <p><a href="mailto:aubrey.zemba@dyedurham.com">aubrey.zemba@dyedurham.com</a></p>
             <p>They will provide you with a customized enterprise-level quote tailored to your specific needs.</p>`;
        
        // Hide the quote cards
        const quoteCards = document.querySelectorAll('.quote-card');
        quoteCards.forEach(card => {
            card.style.display = 'none';
        });
        
        // Show the results section
        quoteResults.style.display = 'block';
        
        // Scroll to results
        quoteResults.scrollIntoView({ behavior: 'smooth' });
    }
    
    // Generate quote based on user inputs
    function generateQuote(firmName, userRange) {
        // Get tier information
        const tierNumber = userRange === 'tier1' ? 1 : 2;
        const planName = userRange === 'tier1' ? 'B2MS' : 'B4MS';
        const userRangeText = userRange === 'tier1' ? '1-10' : '11-20';
        
        // Display thank you message
        document.getElementById('thankYouMessage').textContent = `Thank you, ${firmName}!`;
        
        // Display tier information
        document.getElementById('tierInfo').textContent = 
            `Based on your firm size (${userRangeText} users), we recommend the ${planName} hosting plan (Tier ${tierNumber}).`;
        
        // Show all quote cards
        const quoteCards = document.querySelectorAll('.quote-card');
        quoteCards.forEach(card => {
            card.style.display = 'block';
        });
        
        // Generate resource rows for both options
        generateResourceRows('oneYearOption', userRange);
        generateResourceRows('threeYearOption', userRange);
        
        // Update pricing information
        updatePricing(userRange);
        
        // Reset toggles to Monthly (default)
        oneYearToggle.checked = false;
        threeYearToggle.checked = false;
        updateToggleLabels(oneYearToggle);
        updateToggleLabels(threeYearToggle);
        
        // Show monthly options, hide upfront options
        document.getElementById('oneYearMonthlyOption').style.display = 'block';
        document.getElementById('oneYearUpfrontOption').style.display = 'none';
        document.getElementById('threeYearMonthlyOption').style.display = 'block';
        document.getElementById('threeYearUpfrontOption').style.display = 'none';
        
        // Hide upfront notices
        oneYearUpfrontNotice.style.display = 'none';
        threeYearUpfrontNotice.style.display = 'none';
        
        // Show results section
        quoteResults.style.display = 'block';
        
        // Scroll to results
        quoteResults.scrollIntoView({ behavior: 'smooth' });
    }
    
    // Generate resource rows for a specific plan
    function generateResourceRows(cardId, tier) {
        const resourceTable = document.querySelector(`#${cardId} .resource-table`);
        
        // Clear existing rows except header
        const header = resourceTable.querySelector('.header');
        resourceTable.innerHTML = '';
        resourceTable.appendChild(header);
        
        // Add resource rows
        addResourceRow(resourceTable, 'Virtual Machines', resourceDescriptions.vm);
        addResourceRow(resourceTable, 'VPN Gateway', resourceDescriptions.vpnGateway);
        addResourceRow(resourceTable, 'Managed Disks', resourceDescriptions.managedDisks);
        addResourceRow(resourceTable, 'Virtual Network', resourceDescriptions.virtualNetwork);
        addResourceRow(resourceTable, 'Azure Backup', resourceDescriptions.azureBackup);
    }
    
    // Add a resource row to the table
    function addResourceRow(table, name, description) {
        const row = document.createElement('div');
        row.className = 'resource-row';
        
        const nameDiv = document.createElement('div');
        nameDiv.className = 'resource-name';
        nameDiv.textContent = name;
        
        const descDiv = document.createElement('div');
        descDiv.className = 'resource-description';
        descDiv.textContent = description;
        
        row.appendChild(nameDiv);
        row.appendChild(descDiv);
        
        table.appendChild(row);
    }
    
    // Update pricing information
    function updatePricing(tier) {
        // Get all pricing values
        const oneYearMonthlyTotal = pricingData[tier].oneYearMonthly.total.monthly;
        const oneYearMonthlyUpfront = pricingData[tier].oneYearMonthly.total.upfront;
        const oneYearUpfrontMonthly = pricingData[tier].oneYearUpfront.total.monthly;
        const oneYearUpfrontTotal = pricingData[tier].oneYearUpfront.total.upfront;
        const threeYearMonthlyTotal = pricingData[tier].threeYearMonthly.total.monthly;
        const threeYearMonthlyUpfront = pricingData[tier].threeYearMonthly.total.upfront;
        const threeYearUpfrontMonthly = pricingData[tier].threeYearUpfront.total.monthly;
        const threeYearUpfrontTotal = pricingData[tier].threeYearUpfront.total.upfront;
        
        // Format and display prices
        document.getElementById('oneYearMonthlyTotal').textContent = formatCurrency(oneYearMonthlyTotal);
        document.getElementById('oneYearMonthlyUpfront').textContent = formatCurrency(oneYearMonthlyUpfront);
        document.getElementById('oneYearUpfrontMonthly').textContent = formatCurrency(oneYearUpfrontMonthly);
        document.getElementById('oneYearUpfrontTotal').textContent = formatCurrency(oneYearUpfrontTotal);
        document.getElementById('threeYearMonthlyTotal').textContent = formatCurrency(threeYearMonthlyTotal);
        document.getElementById('threeYearMonthlyUpfront').textContent = formatCurrency(threeYearMonthlyUpfront);
        document.getElementById('threeYearUpfrontMonthly').textContent = formatCurrency(threeYearUpfrontMonthly);
        document.getElementById('threeYearUpfrontTotal').textContent = formatCurrency(threeYearUpfrontTotal);
    }
    
    // Format currency (ZAR only)
    function formatCurrency(amount) {
        return amount === 0 ? 'R0.00' : `R${amount.toFixed(2)}`;
    }
    
    // Toggle handlers
    oneYearToggle.addEventListener('change', function() {
        const monthlyOption = document.getElementById('oneYearMonthlyOption');
        const upfrontOption = document.getElementById('oneYearUpfrontOption');
        
        if (this.checked) {
            // Show upfront, hide monthly
            monthlyOption.style.display = 'none';
            upfrontOption.style.display = 'block';
            oneYearUpfrontNotice.style.display = 'flex';
        } else {
            // Show monthly, hide upfront
            monthlyOption.style.display = 'block';
            upfrontOption.style.display = 'none';
            oneYearUpfrontNotice.style.display = 'none';
        }
        
        updateToggleLabels(this);
    });
    
    threeYearToggle.addEventListener('change', function() {
        const monthlyOption = document.getElementById('threeYearMonthlyOption');
        const upfrontOption = document.getElementById('threeYearUpfrontOption');
        
        if (this.checked) {
            // Show upfront, hide monthly
            monthlyOption.style.display = 'none';
            upfrontOption.style.display = 'block';
            threeYearUpfrontNotice.style.display = 'flex';
        } else {
            // Show monthly, hide upfront
            monthlyOption.style.display = 'block';
            upfrontOption.style.display = 'none';
            threeYearUpfrontNotice.style.display = 'none';
        }
        
        updateToggleLabels(this);
    });
    
    // Update toggle labels (active state)
    function updateToggleLabels(toggle) {
        const toggleContainer = toggle.closest('.toggle');
        const monthlyLabel = toggleContainer.querySelector('.monthly');
        const upfrontLabel = toggleContainer.querySelector('.upfront');
        
        if (toggle.checked) {
            // Upfront is active
            monthlyLabel.classList.remove('active');
            upfrontLabel.classList.add('active');
        } else {
            // Monthly is active
            monthlyLabel.classList.add('active');
            upfrontLabel.classList.remove('active');
        }
    }
    
    // Add event listeners for the "Select This Plan" buttons
    const planButtons = document.querySelectorAll('.btn-secondary');
    planButtons.forEach(button => {
        button.addEventListener('click', async function() {
            try {
                const planCard = this.closest('.quote-card');
                const planTitle = planCard.querySelector('h3').textContent;
                const isOneYear = planCard.id === 'oneYearOption';
                const isMonthly = isOneYear ? 
                    !document.getElementById('oneYearToggle').checked :
                    !document.getElementById('threeYearToggle').checked;
                
                // Get form data
                const firmName = document.getElementById('firmName').value.trim();
                const userRange = document.querySelector('input[name="userCount"]:checked')?.value;

                // Validate inputs
                if (!firmName) {
                    alert('Please enter your firm name');
                    return;
                }
                if (!userRange) {
                    alert('Please select a user range');
                    return;
                }

                // Show loading state
                button.disabled = true;
                const originalText = button.textContent;
                button.textContent = 'Generating PDF...';

                // Get pricing data based on selection
                const pricingKey = isMonthly ? 
                    (isOneYear ? 'oneYearMonthly' : 'threeYearMonthly') :
                    (isOneYear ? 'oneYearUpfront' : 'threeYearUpfront');

                const pricing = {
                    monthly: pricingData[userRange][pricingKey].total.monthly,
                    upfront: pricingData[userRange][pricingKey].total.upfront
                };

                // Generate PDF
                const success = await generateQuotePDF(
                    firmName,
                    userRange,
                    planTitle,
                    isMonthly,
                    pricing
                );

                if (!success) {
                    throw new Error('PDF generation failed');
                }

                // Reset button state
                button.disabled = false;
                button.textContent = originalText;

            } catch (error) {
                console.error('Error in quote generation:', error);
                alert('There was an error generating your quote. Please try again.');
                button.disabled = false;
                button.textContent = 'Select This Plan';
            }
        });
    });
    
    // Input validation for user count
    userCountInput.addEventListener('input', function() {
        const userCount = parseInt(this.value);
        
        if (isNaN(userCount)) {
            userCountError.textContent = 'Please enter a valid number';
        } else if (userCount < 1) {
            userCountError.textContent = 'Number of users must be at least 1';
        } else if (userCount > 20) {
            userCountError.textContent = 'For more than 20 users, please submit the form to contact our consultant';
        } else {
            userCountError.textContent = '';
        }
    });
}); 

async function generateQuotePDF(firmName, userRange, planTitle, isMonthly, pricing) {
    try {
        // Create new document
        const doc = new jsPDF({
            orientation: 'portrait',
            unit: 'mm',
            format: 'a4'
        });

        // Add the main title
        doc.setFontSize(20);
        doc.setTextColor(237, 27, 96); // D&D Pink (#ed1b60)
        doc.text('Azure Hosting Quote', 20, 30);

        // Add Dye & Durham text
        doc.setFontSize(20);
        doc.setTextColor(153, 0, 90); // D&D Dark Pink
        doc.text('Dye & Durham', 140, 30);

        // Skip logo for now as it's causing issues
        // Continue with the rest of the PDF generation

        // Quote Details
        doc.setFontSize(12);
        doc.setTextColor(153, 0, 90); // D&D Dark Pink (#99005a)
        doc.text('Quote Details', 20, 70);
        doc.setFontSize(10);
        doc.setTextColor(51, 51, 51); // Neutral dark
        doc.text(`Date: ${new Date().toLocaleDateString()}`, 20, 80);
        doc.text(`Firm Name: ${firmName}`, 20, 85);
        doc.text(`Plan: ${planTitle}`, 20, 90);
        doc.text(`Payment Option: ${isMonthly ? 'Monthly' : 'Upfront'}`, 20, 95);

        // Pricing Table
        doc.setFontSize(12);
        doc.setTextColor(153, 0, 90);
        doc.text('Pricing Summary', 20, 110);
        
        const pricingData = [
            ['Description', 'Amount (ZAR)'],
            ['Monthly Payment', `R ${pricing.monthly.toFixed(2)}`],
            ['Upfront Payment', `R ${pricing.upfront.toFixed(2)}`]
        ];

        doc.autoTable({
            startY: 115,
            head: [pricingData[0]],
            body: pricingData.slice(1),
            margin: { left: 20 },
            theme: 'grid',
            headStyles: {
                fillColor: [237, 27, 96],
                textColor: [255, 255, 255]
            },
            alternateRowStyles: {
                fillColor: [255, 235, 242]
            }
        });

        // Resources Section
        doc.setFontSize(12);
        doc.setTextColor(153, 0, 90);
        doc.text('Included Resources', 20, 160);

        const resources = [
            ['Resource', 'Description'],
            ['Virtual Machines', 'Virtual machine for hosting your applications and services'],
            ['VPN Gateway', 'Secure connection between your on-premises network and Azure'],
            ['Managed Disks', 'Storage for your virtual machine data'],
            ['Virtual Network', 'Private network in Azure for your resources'],
            ['Azure Backup', 'Backup service for your data and applications']
        ];

        doc.autoTable({
            startY: 165,
            head: [resources[0]],
            body: resources.slice(1),
            margin: { left: 20 },
            theme: 'grid',
            headStyles: {
                fillColor: [237, 27, 96],
                textColor: [255, 255, 255]
            },
            alternateRowStyles: {
                fillColor: [255, 235, 242]
            }
        });

        // Terms and Conditions
        doc.setFontSize(10);
        doc.setTextColor(153, 0, 90);
        doc.text('Terms and Conditions:', 20, 230);
        doc.setFontSize(8);
        doc.setTextColor(51, 51, 51);
        doc.text([
            '• All prices are in South African Rand (ZAR) and exclude VAT',
            '• Prices are subject to change based on Azure pricing updates',
            '• Support is included in the quoted price',
            '• This quote is valid for 30 days from the date of issue'
        ], 25, 240);

        // Footer
        doc.setFontSize(8);
        doc.setTextColor(153, 0, 90);
        doc.text('For any queries, please contact:', 20, 280);
        doc.text('aubrey.zemba@dyedurham.com', 20, 285);
        doc.text(`Generated on ${new Date().toLocaleString()}`, 20, 290);

        // Save the PDF
        const fileName = `${firmName.replace(/[^a-zA-Z0-9]/g, '_')}_Azure_Quote.pdf`;
        doc.save(fileName);

        return true;
    } catch (error) {
        console.error('PDF Generation Error:', error);
        return false;
    }
}
