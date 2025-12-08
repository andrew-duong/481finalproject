
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

To perform scenario 1:
Scenario 1 – Staff Adds a Log
Tap Log In and sign into the system using any staff account.
Press Log on the bottom navigation bar. You should be redirected to the Add Logs page.
Select the children for the log by opening the Select Children dropdown and checking the desired children. A Behavioural Notes section should now appear.
From the Activity Name dropdown, select Arts & Crafts.
Adjust the Start Time and End Time as needed.
Enter a note in the General Notes field.
To add behavioural notes for a specific child:
  Tap the + icon in the Behavioural Notes section.
  Select a child and enter their note. The note should save automatically.
After completing all details, tap Submit.
You should be redirected to the Logged Activities page.
The newly added log should appear on the list.

To perform Scenario 2 – Parent Views Daily Activity:
Tap Log In and sign into the system using any parent account.
Press Activity on the bottom navigation bar. You should be redirected to the My Children page.
Select a child from the list. You should be redirected to the Daily Activity page for that child.
To view full activity details, tap the dropdown arrow on the right side of any activity card.
The general notes and any behavioural notes should now be visible.

To perform Scenario 3 – Parent Views Events:

Tap Log In and sign in using any parent account.
On the Home page, a Calendar View and an Events This Month section should appear.
Press Events on the bottom navigation bar. You should be redirected to the Upcoming Events page.
If the account has multiple children, select a child using the child selector at the top.
A list of all events for that child should appear.
Tap the Details button on any event to open its Event Details page.
The event details page should display:
  Location
  Date & Time
  Notes
  Description
  Fee (if applicable)
At the bottom of the screen, a button for Form and/or Payment should appear (depending on requirements for that event):
  If the fee is paid → Button shows Paid and is disabled
  If the form is filled → Button shows Filled and is disabled
Tap the form button to be redirected to the corresponding Form Page.

To perform Scenario 4 – Staff Creates an Event:
Tap Log In and sign into the system using any staff account.

Press Events on the bottom navigation bar. You should be redirected to the Upcoming Events page.
Tap Add Event at the top of the screen to open the Add Event page.
Enter all required fields:
  Event title
  Location
  Date
  Selected children (via dropdown)
  Start and end time
Enter optional Description and Notes.
Attach a form if needed by tapping the Upload section.
After confirming all details, tap Submit.
You should be redirected to the Events page, where the newly created event will appear in the list.

To perform Scenario 5 – Parent Fills Out a Form:
Tap Log In and sign into the system using any parent account.
Press Form on the bottom navigation bar. You should be redirected to the Forms page.
If multiple children exist, select a child from the selector at the top.
A list of all forms for that child will appear.
Forms have three statuses:
  Outstanding → Shows an active Fill button
  Pending → Shows a disabled Filled button
  Completed → Shows a disabled Filled button
Tap Fill on any Outstanding form. You should be redirected to the Form Details page.
At the top of the page, a Download option for the form should be visible.
Fill out all required fields:
  Parent name
  Emergency contact
  E-signature
  Consent
Add optional notes if needed.
Tap Submit Form. You should be redirected back to the Forms page, where the submitted form should now have the status Pending.

To perform scenario 6:
Tap Log In and sign into the system using any parent account.
Press Pay on the bottom navigation bar. You should be redirected to the Fees page.
If multiple children exist, select a child from the selector at the top.
A list of all fees for that child will appear.
Fees have three statuses:
  Outstanding → Shows an active Pay Now button
  Pending → Shows a disabled Paid button
  Completed → Shows a disabled Paid button
Tap Pay Now on any Outstanding fee. You should be redirected to the Payments page.
Fill out all required payment fields:
  Cardholder Name
  Card Number
  Expiry Date
  CVV
Tap Complete Payment. You should be redirected to the Payment Confirmation page.


