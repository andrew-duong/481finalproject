Mariam Ibrahim - mariam.ibrahim1@ucalgary.ca
Christopher Luk - christopher.luk1@ucalgary.ca
Ezra Chin - ezra.chin@ucalgary.ca
Katrina Chu - katrina.chu@ucalgary.ca
Andrew Duong - andrew.duong@ucalgary.ca

  # Sunnyview Daycare

  ## Running the code

  Run `npm i` to install the dependencies.

  Run `npm run dev` to start the development server.

  or goto https://sunnyview.netlify.app/
  
  Staff logins:
  alice@sunnyview.com / cpsc481
  bob@sunnyview.com / cpsc481
  carol@sunnyview.com / cpsc481

  Parent logins:
  darren@sunnyview.com / cpsc481 
  lindsay@sunnyview.com / cpsc481
  george@sunnyview.com / cpsc481
  sofia@sunnyview.com / cpsc481
  joanne@sunnyview.com / cpsc481
  paula@sunnyview.com / cpsc481

To use the system as a staff member, log in using one of the staff logins. To use the system as a parent, log in using one of the parent logins.
Scenarios 1-6 listed in design portfolio 1 were implemented in the system.

1. Scenario 1 – Staff Adds a Log
<ol> <li>Tap <strong>Log In</strong> and sign into the system using any <strong>staff</strong> account.</li> <li>Press <strong>Log</strong> on the bottom navigation bar. You will be redirected to the <strong>Add Logs</strong> page.</li> <li>Open the <strong>Select Children</strong> dropdown and check the children to include in the log. A <strong>Behavioural Notes</strong> section will appear.</li> <li>Select <strong>Arts & Crafts</strong> from the <strong>Activity Name</strong> dropdown.</li> <li>Adjust the <strong>Start Time</strong> and <strong>End Time</strong> as needed.</li> <li>Enter a note in the <strong>General Notes</strong> field.</li> <li>To add behavioural notes for a specific child: <ol> <li>Tap the <strong>+</strong> icon.</li> <li>Select a child and enter their note (it saves automatically).</li> </ol> </li> <li>Tap <strong>Submit</strong> to finalize the log.</li> <li>You will be redirected to the <strong>Logged Activities</strong> page.</li> <li>The newly added log should appear in the list.</li> </ol>
2. Scenario 2 – Parent Views Daily Activity
<ol> <li>Tap <strong>Log In</strong> and sign into the system using any <strong>parent</strong> account.</li> <li>Press <strong>Activity</strong> on the bottom navigation bar to open the <strong>My Children</strong> page.</li> <li>Select a child to open their <strong>Daily Activity</strong> page.</li> <li>Tap the <strong>dropdown arrow</strong> on an activity card to expand it.</li> <li>The general notes and any behavioural notes will be displayed.</li> </ol>
3. Scenario 3 – Parent Views Events
<ol> <li>Tap <strong>Log In</strong> and sign in using any parent account.</li> <li>On the Home page, a <strong>Calendar View</strong> and an <strong>Events This Month</strong> section will appear.</li> <li>Press <strong>Events</strong> on the bottom navigation bar to open the <strong>Upcoming Events</strong> page.</li> <li>If multiple children exist, select a child using the <strong>child selector</strong>.</li> <li>A list of events for that child will appear.</li> <li>Tap <strong>Details</strong> on an event to open the <strong>Event Details</strong> page.</li> <li>The page will display: <ul> <li>Location</li> <li>Date & Time</li> <li>Notes</li> <li>Description</li> <li>Fee (if applicable)</li> </ul> </li> <li>A button for <strong>Form</strong> and/or <strong>Payment</strong> will appear: <ul> <li><strong>Paid</strong> → disabled</li> <li><strong>Filled</strong> → disabled</li> </ul> </li> <li>Tap the <strong>Form</strong> button to open the form page.</li> </ol>
4. Scenario 4 – Staff Creates an Event
<ol> <li>Tap <strong>Log In</strong> and sign in using any <strong>staff</strong> account.</li> <li>Press <strong>Events</strong> to open the <strong>Upcoming Events</strong> page.</li> <li>Tap <strong>Add Event</strong> to open the <strong>Add Event</strong> page.</li> <li>Enter all required fields: <ul> <li>Event Title</li> <li>Location</li> <li>Date</li> <li>Selected Children</li> <li>Start & End Time</li> </ul> </li> <li>Add optional <strong>Description</strong> and <strong>Notes</strong>.</li> <li>Attach a form if needed using the <strong>Upload</strong> section.</li> <li>Tap <strong>Submit</strong> to create the event.</li> <li>You will be redirected to the <strong>Events</strong> page with the new event listed.</li> </ol>
5. Scenario 5 – Parent Fills Out a Form
<ol> <li>Tap <strong>Log In</strong> and sign in using any <strong>parent</strong> account.</li> <li>Press <strong>Form</strong> to open the <strong>Forms</strong> page.</li> <li>If multiple children exist, select a child using the <strong>child selector</strong>.</li> <li>Forms have three statuses: <ul> <li><strong>Outstanding</strong> → Fill button enabled</li> <li><strong>Pending</strong> → Filled button disabled</li> <li><strong>Completed</strong> → Filled button disabled</li> </ul> </li> <li>Tap <strong>Fill</strong> on any Outstanding form.</li> <li>On the <strong>Form Details</strong> page, a <strong>Download</strong> option will appear.</li> <li>Fill out all required fields: <ul> <li>Parent Name</li> <li>Emergency Contact</li> <li>E-Signature</li> <li>Consent</li> </ul> </li> <li>Add optional notes if needed.</li> <li>Tap <strong>Submit Form</strong>.</li> <li>The form will return to the list with a <strong>Pending</strong> status.</li> </ol>
6. Scenario 6 – Parent Pays a Fee
<ol> <li>Tap <strong>Log In</strong> and sign into the system using any <strong>parent</strong> account.</li> <li>Press <strong>Pay</strong> to open the <strong>Fees</strong> page.</li> <li>If multiple children exist, select a child using the <strong>child selector</strong>.</li> <li>Fees have three statuses: <ul> <li><strong>Outstanding</strong> → Pay Now enabled</li> <li><strong>Pending</strong> → Paid disabled</li> <li><strong>Completed</strong> → Paid disabled</li> </ul> </li> <li>Tap <strong>Pay Now</strong> on an Outstanding fee.</li> <li>Fill in: <ul> <li>Cardholder Name</li> <li>Card Number</li> <li>Expiry Date</li> <li>CVV</li> </ul> </li> <li>Tap <strong>Complete Payment</strong>.</li> <li>You will be redirected to the <strong>Payment Confirmation</strong> page.</li> </ol>

