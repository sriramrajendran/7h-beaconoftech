## Re group profile under /sriram-rajendran page

Currently profile is listed under @/sriram-rajendran/index.html, with subsections:
- Home
- About
- Research
- Patents
- Speaking
- Judging
- Recognition
- TPC
- Volunteering
- Credentials

Now, Need grouping to be done under these  major sections:
- Home
- About
- Mentoring and Coaching
   - Projects and Impacts (new section - add these details)
                    Year	Firm	Code words	Media	Impact
            2025	Capital One Core modernization	Mordenize core	"https://aws.amazon.com/solutions/case-studies/innovators/capital-one/
            https://www.autofinancenews.net/allposts/technology/capital-one-looks-to-raise-the-bar-on-technology"	"- Exiting mainframe and migration of core to microservices & cloud native platform;
            - $8M YoY"
            2024	Capital One Auto  payments tech modernization	Payments mordenization	"https://aws.amazon.com/solutions/case-studies/innovators/capital-one/
            https://www.vertexuxstudio.com/case-studies/transforming-auto-finance

            https://www.ciodive.com/news/capital-one-tech-modernization-discover-card-integration/738009
            https://www.autofinancenews.net/allposts/technology/capital-ones-tech-stack-drives-growth-opportunities/?utm_source=chatgpt.com"	"- Auto portfolio customer base migrated to new payments platform, allowing real time payments to be built on the platform;
            - faster clearing savings
            - $10M YoY"
            2019	Capital One Auto Debit cards	"Debit cards;
            Vendor payments"		"- Debit card processing for auto loan payments
            - Establishing platform for vendor payments;
            - $6M YoY"
            2018	Capital One Auto  Cloud migration	Cloud migration	"https://www.forbes.com/sites/oracle/2018/11/14/how-capital-one-became-the-first-us-bank-to-go-all-in-on-the-public-cloud/
            https://www.capitalone.com/tech/cloud/
            https://aws.amazon.com/blogs/industries/capital-one-brings-sustainability-to-its-cloud-migration/"	"- Data center exit and 100% vesting into cloud;
            - Strategic pivot;
            - Resiliency improvements;
            "
   - Patents
   - Research
   - Volunteering
   - Judging & Mentoring
- Public Influence
   - Speaking
   - Articles
   - TPC
   - Recognition
- Credentials

### Menu navigation:
- Hovering over "Mentoring and Coaching" should show sub-menu with "Projects and Impacts", "Patents", "Research", "Volunteering", "Judging & Mentoring"
- Hovering over "Public Influence" should show sub-menu with "Speaking", "Articles", "TPC"
- Clicking on any of the above should navigate to the respective section - same for main menu items "Mentoring and Coaching", "Public Influence", "Recognition", "Credentials"
- no links to sub-sections in main menu, like:
    http://localhost:8000/sriram-rajendran/#speaking
    http://localhost:8000/sriram-rajendran/#blogs
    http://localhost:8000/sriram-rajendran/#technical-committee , etc., remove all of these..
    There should be links to only the main menu items. Example:
    http://localhost:8000/sriram-rajendran/#home
    http://localhost:8000/sriram-rajendran/#about
    http://localhost:8000/sriram-rajendran/#mentoring-and-coaching
    http://localhost:8000/sriram-rajendran/#public-influence
    http://localhost:8000/sriram-rajendran/#credentials
- Font for headings:
    "Mentoring & Coaching" should be in bold
        - currently sub headings are bigger than main headings, make them slightly smaller size
    "Public Influence" should be in bold
        - currently sub headings are bigger than main headings, make them slightly smaller size

        and so on
        