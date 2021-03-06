/*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
 ______    ______    ______   __  __    __    ______
 /\  == \  /\  __ \  /\__  _\ /\ \/ /   /\ \  /\__  _\
 \ \  __<  \ \ \/\ \ \/_/\ \/ \ \  _"-. \ \ \ \/_/\ \/
 \ \_____\ \ \_____\   \ \_\  \ \_\ \_\ \ \_\   \ \_\
 \/_____/  \/_____/    \/_/   \/_/\/_/  \/_/    \/_/


 This is a sample Slack Button application that provides a custom
 Slash command.

 This bot demonstrates many of the core features of Botkit:

 *
 * Authenticate users with Slack using OAuth
 * Receive messages using the slash_command event
 * Reply to Slash command both publicly and privately

 # RUN THE BOT:

 Create a Slack app. Make sure to configure at least one Slash command!

 -> https://api.slack.com/applications/new

 Run your bot from the command line:

 clientId=<my client id> clientSecret=<my client secret> PORT=3000 node bot.js

 Note: you can test your oauth authentication locally, but to use Slash commands
 in Slack, the app must be hosted at a publicly reachable IP or host.


 # EXTEND THE BOT:

 Botkit is has many features for building cool and useful bots!

 Read all about it here:

 -> http://howdy.ai/botkit

 ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/

/* Uses the slack button feature to offer a real time bot to multiple teams */
var Botkit = require('botkit');

if (!process.env.CLIENT_ID || !process.env.CLIENT_SECRET ) {
    console.log('Error: Specify CLIENT_ID, CLIENT_SECRET, VERIFICATION_TOKEN and PORT in environment');
    process.exit(1);
}

var config = {}
if (process.env.MONGOLAB_URI) {
    var BotkitStorage = require('botkit-storage-mongo');
    config = {
        storage: BotkitStorage({mongoUri: process.env.MONGOLAB_URI}),
    };
} else {
    config = {
        json_file_store: './db_slackbutton_slash_command/',
    };
}

var controller = Botkit.slackbot(config).configureSlackApp(
    {
        clientId: process.env.CLIENT_ID,
        clientSecret: process.env.CLIENT_SECRET,
        scopes: ['commands'],
    }
);

controller.setupWebserver(process.env.PORT, function (err, webserver) {
    controller.createWebhookEndpoints(controller.webserver);

    controller.createOauthEndpoints(controller.webserver, function (err, req, res) {
        if (err) {
            res.status(500).send('ERROR: ' + err);
        } else {
            res.send('Success!');
        }
    });
});


//
// BEGIN EDITING HERE!
//

controller.on('slash_command', function (slashCommand, message) {

    switch (message.command) {
        case "/jira": //handle the `/echo` slash command. We might have others assigned to this app too!
            // The rules are simple: If there is no text following the command, treat it as though they had requested "help"
            // Otherwise just echo back to them what they sent us.

            // but first, let's make sure the token matches!
            // if (message.token !== process.env.VERIFICATION_TOKEN) return; //just ignore it.

            // if no text was supplied, treat it as a help command
            if (message.text === "" || message.text === "help") {
                slashCommand.replyPrivate(message,
                    "Welcome to JIRABot! I help you look up JIRA templates.\n" +
                    "Type:\n" +
                    "`/jira bidding`  for  Bidding, Insurance\n" +
                    "`/jira budget`  for  Budget, Cost Codes, Timecard\n" +
                    "`/jira change events`  for  Change Events, Change Orders\n" +
                    "`/jira collab`  for  RFI's, Submittals, Transmittals, Meetings, Emails, Directory, Admin, Project Creation\n" +
                    "`/jira documents`  for  Documents, Photos\n" +
                    "`/jira drawings`  for  Drawings, Specifications, Custom Tools, BIM\n" +
                    "`/jira drive`  for  Drive, Schedules, Windows\n" +
                    "`/jira field tools`  for  Inspections, Observations, Punch List, Daily Log\n" +
                    "`/jira insights`  for  Reports, Custom, Reporting, Home, Portfolio\n" +
                    "`/jira integrations`  for  ERP, other integrations\n" +
                    "`/jira mobile tools`  for  Android, iOS \n" +
                    "`/jira prime contract`  for  Prime Contract, Direct Cost, Payment Applications and Draw Requests, Commitments\n" +
                    "`/jira auto file ticket` to automatically create this ticket");
                return;
            }
            
            switch(message.text){
                case "change events":
                    t = "_*Change Events*_\n" +
"```*Context:* [What is happening?]\n" + 
"*User's Email Address:*\n" + 
"*Scope:*\n" + 
"* Has this been tested on multiple browsers? [Yes/No - Which browsers]: \n" +
"* Has this been tested in multiple projects? [Yes/No - Links to projects tested in] \n" +
"* Has this been tested in multiple companies? [Yes/No - Names of companies] \n\n" +
"*Expected Outcome:* [What should be happening?] \n" +
"*Actual Outcome:* [What is happening instead?] \n" +
"*Steps to Recreate:* \n" +
"# Add link here \n" +
"# ... \n\n" +
"*Additional Information:* \n" +
"*Workaround:* [Is there a reliable workaround being recommended to users?]  \n" +
"*404/500 Error:* [Yes/No - Attach screenshot with address bar included if yes] \n" +
"*Console Error:* [Yes/No - Attach screenshot if yes] \n```";
                    slashCommand.replyPrivate(message, t);
                return;
                case "collab":
                    t = "_*Collab*_\n" +
"```{color:#d04437}##Fun Fact: This squad receives approximately 60% of support tickets! Let's do what we can to make sure they don't have to reach back out for additional information. Thanks for your extra effort on these tickets, supporticans!##{color}\n\n" +
"*Context:* [What is happening?]\n" + 
"*User's Email Address:*\n" +
"*Scope:*\n" + 
"* Has this been tested on multiple browsers? [Yes/No - Which browsers]: \n" +
"* Has this been tested in multiple projects? [Yes/No - Links to projects tested in] \n" +
"* Has this been tested in multiple companies? [Yes/No - Names of companies] \n\n" +
"*Expected Outcome:* [What should be happening?] \n" +
"*Actual Outcome:* [What is happening instead?] \n" +
"*Steps to Recreate:* \n" +
"# Add link here \n" +
"# ... \n\n" +
"*Additional Information:* \n" +
"*Other troubleshooting steps that have been taken:* \n" +
"*Workaround:* [Is there a reliable workaround being recommended to users?]  \n" +
"*404/500 Error:* [Yes/No - Attach screenshot with address bar included if yes] \n" +
"*Console Error:* {color:#d04437}[Yes/No - Screenshots of console errors are particularly useful to this squad. Please attach one if you are able]{color} \n```";
                    slashCommand.replyPrivate(message, t);
                    return;
                    case "bidding":
                    t = "_*Bidding*_\n" +
"```*Context:* [What is happening?]\n" + 
"*User's Email Address:*\n" +
"*Scope:*\n" + 
"* Has this been tested on multiple browsers? [Yes/No - Which browsers]: \n" +
"* Has this been tested in multiple projects? [Yes/No - Links to projects tested in] \n" +
"* Has this been tested in multiple companies? [Yes/No - Names of companies] \n\n" +
"*Expected Outcome:* [What should be happening?] \n" +
"*Actual Outcome:* [What is happening instead?] \n" +
"*Steps to Recreate:* \n" +
"# Add link here \n" +
"# ... \n\n" +
"*Additional Information:* \n" +
"*Workaround:* [Is there a reliable workaround being recommended to users?]  \n" +
"*404/500 Error:* [Yes/No - Attach screenshot with address bar included if yes] \n" +
"*Console Error:* [Yes/No - Attach screenshot if yes] \n```";
                    slashCommand.replyPrivate(message, t);
                    return;
                    case "budget":
                    t = "_*Budget*_\n" +
"```*Context:* [What is happening?]\n" +
"*Users Email Address:* \n" +
"*Scope:*\n" + 
"* Has this been tested on multiple browsers? [Yes/No - Which browsers]: \n" +
"* Has this been tested in multiple projects? [Yes/No - Links to projects tested in] \n" +
"* Has this been tested in multiple companies? [Yes/No - Names of companies] \n\n" +
"*Expected Outcome:* [What should be happening?] \n" +
"*Actual Outcome:* [What is happening instead?] \n" +
"*Steps to Recreate:* \n" +
"# Add link here \n" +
"# ... \n\n" +
"*Additional Information:* \n" +
"*Workaround:* [Is there a reliable workaround being recommended to users?]  \n" +
"*404/500 Error:* [Yes/No - Attach screenshot with address bar included if yes] \n" +
"*Console Error:* [Yes/No - Attach screenshot if yes] \n```";
                    slashCommand.replyPrivate(message, t);
                    return;   
                    case "documents":
                    t = "_*Documents*_\n" +
"```{color:#d04437}##IF THIS IS A DOCUMENT UPLOAD ERROR, PLEASE ATTACH THE DOCUMENT##{color}\n\n" +
"*Context:* [What is happening?]\n" + 
"*Scope:*\n" + 
"* Has this been tested on multiple browsers? [Yes/No - Which browsers]: \n" +
"* Has this been tested in multiple projects? [Yes/No - Links to projects tested in] \n" +
"* Has this been tested in multiple companies? [Yes/No - Names of companies] \n\n" +
"*Expected Outcome:* [What should be happening?] \n" +
"*Actual Outcome:* [What is happening instead?] \n" +
"*Steps to Recreate:* \n" +
"# Add link here \n" +
"# ... \n\n" +
"*Additional Information:* \n" +
"*Workaround:* [Is there a reliable workaround being recommended to users?]  \n" +
"*404/500 Error:* [Yes/No - Attach screenshot with address bar included if yes] \n" +
"*Console Error:* {color:#d04437}[Yes/No - Screenshots of console errors are particularly useful to this squad. Please attach one if you are able]{color} \n```";
                    slashCommand.replyPrivate(message, t);
                    return;
                    case "drawings":
                    t = "_*Drawings*_\n" +
"```{color:#d04437}##IF THIS IS A DOCUMENT UPLOAD ERROR, PLEASE ATTACH THE DOCUMENT##{color}\n\n" +
"*Context:* [What is happening?]\n" + 
"*User's email address:* \n" + 
"*Scope:*\n" + 
"* Has this been tested on multiple browsers? [Yes/No - Which browsers]: \n" +
"* Has this been tested in multiple projects? [Yes/No - Links to projects tested in] \n" +
"* Has this been tested in multiple companies? [Yes/No - Names of companies] \n\n" +
"*Expected Outcome:* [What should be happening?] \n" +
"*Actual Outcome:* [What is happening instead?] \n" +
"*Steps to Recreate:* \n" +
"# Add link here \n" +
"# ... \n\n" +
"*Additional Information:* \n" +
"*Workaround:* [Is there a reliable workaround being recommended to users?]  \n" +
"*404/500 Error:* [Yes/No - Attach screenshot with address bar included if yes] \n" +
"{color:#d04437} [Yes/No - Screenshots of console are particularly useful to this squad. Please attach if you are able.] {color} \n```";
                    slashCommand.replyPrivate(message, t);
                    return;                
                    case "drive":
                    t = "_*Drive*_\n" +
"```{color:#d04437}Before creating this JIRA, have you tried the troubleshooting tips here?{color} https://docs.google.com/a/procore.com/spreadsheets/d/1t4ZqE1lzNprLwagWiJ-q6MkQELt9QkHZ6P4Uxl-dPPc/edit?usp=sharing \n\n" +
"*Context:* [What is happening?]\n" + 
"*Scope:*\n" + 
"* Has this been tested on multiple browsers? [Yes/No - Which browsers]: \n" +
"* Has this been tested in multiple projects? [Yes/No - Links to projects tested in] \n" +
"* Has this been tested in multiple companies? [Yes/No - Names of companies] \n\n" +
"*Expected Outcome:* [What should be happening?] \n" +
"*Actual Outcome:* [What is happening instead?] \n" +
"*Steps to Recreate:* \n" +
"# Add link here \n" +
"# ... \n\n" +
"*Additional Information:* \n" +
"*Workaround:* [Is there a reliable workaround being recommended to users?]  \n" +
"*404/500 Error:* [Yes/No - Attach screenshot with address bar included if yes] \n" +
"*Console Error:* [Yes/No - Attach screenshot if yes] \n\n" +
"{color:#d04437}##IF THIS IS A DOCUMENT UPLOAD ERROR, PLEASE ATTACH THE DOCUMENT##{color} \n```";
                    slashCommand.replyPrivate(message, t);
                    return;
                    case "field tools":
                    t = "_*Field Tools*_\n" +
"```*Context:* [What is happening?]\n" + 
"*Scope:*\n" + 
"* Has this been tested on multiple browsers? [Yes/No - Which browsers]: \n" +
"* Has this been tested in multiple projects? [Yes/No - Links to projects tested in] \n" +
"* Has this been tested with multiple users? [Yes/No - User Emails] \n" +
"* Has this been tested with different permission levels? [Yes/No - Permission levels affected] \n" +
"* Has this been tested in multiple companies? [Yes/No - Names of companies] \n\n" +
"*Expected Outcome:* [What should be happening?] \n" +
"*Actual Outcome:* [What is happening instead?] \n" +
"*Steps to Recreate:* \n" +
"# Add link here \n" +
"# ... \n\n" +
"*Additional Information:* \n" +
"*Workaround:* [Is there a reliable workaround being recommended to users?]  \n" +
"*404/500 Error:* [Yes/No - Attach screenshot with address bar included if yes] \n" +
"*Console Error:* [Yes/No - Attach screenshot if yes] \n```";
                    slashCommand.replyPrivate(message, t);
                    return;
                    case "insights":
                    t = "_*Insights*_\n" +
"```*Context:* [What is happening?]\n" + 
"*User's Email Address:*\n" +
"*Scope:*\n" + 
"* Has this been tested on multiple browsers? [Yes/No - Which browsers]: \n" +
"* Has this been tested in multiple projects? [Yes/No - Links to projects tested in] \n" +
"* Has this been tested in multiple companies? [Yes/No - Names of companies] \n\n" +
"*Expected Outcome:* [What should be happening?] \n" +
"*Actual Outcome:* [What is happening instead?] \n" +
"*Steps to Recreate:* \n" +
"# Add link here \n" +
"# ... \n\n" +
"*Additional Information:* \n" +
"*Workaround:* [Is there a reliable workaround being recommended to users?]  \n" +
"*404/500 Error:* [Yes/No - Attach screenshot with address bar included if yes] \n" +
"*Console Error:* [Yes/No - Attach screenshot if yes] \n```";
                    slashCommand.replyPrivate(message, t);
                    return;                
                    case "integrations":
                    t = "_*Integrations*_\n" +
"```*Context:* [What is happening?]\n" + 
"*Scope:*\n" + 
"* Has this been tested on multiple browsers? [Yes/No - Which browsers]: \n" +
"* Has this been tested in multiple projects? [Yes/No - Links to projects tested in] \n" +
"* Has this been tested in multiple companies? [Yes/No - Names of companies] \n\n" +
"*Expected Outcome:* [What should be happening?] \n" +
"*Actual Outcome:* [What is happening instead?] \n" +
"*Steps to Recreate:* \n" +
"# Add link here \n" +
"# ... \n\n" +
"*Additional Information:* \n" +
"*Workaround:* [Is there a reliable workaround being recommended to users?]  \n" +
"*404/500 Error:* [Yes/No - Attach screenshot with address bar included if yes] \n" +
"*Console Error:* [Yes/No - Attach screenshot if yes] \n```";
                    slashCommand.replyPrivate(message, t);
                    return;
                    case "mobile tools":
                    t = "_*Mobile Tools*_\n" +
"```{color:#d04437}Summary field should be in this format: [TOOL NAME: Title of Issue]{color}\n\n" +
"*Context:* [What is happening? - Keep this concise and relevant.] \n\n" +
"*Device Information:* \n" +
"* Android/iOS version: \n" +
"* Device Model: \n" +
"* Version of Procore App: \n\n" +
"*User's Email Address:* \n" +
"*Link to page on web:* \n\n" +
"*Scope:* \n" +
"* Has this been tested on multiple devices? [Yes/No - Which devices, and what were the results?]: \n" +
"* Has this been tested in multiple projects/companies? [Yes/No - Links to projects tested in] \n\n" +
"*Steps to Replicate:* - Not a link; should be actual steps to recreate the problem. \n" +
"# ... \n" +
"# ... \n\n" +
"*Additional Information:* \n" +
"*Workaround:* [Is there a reliable workaround being recommended to users?] \n\n" +
"*Expected Outcome:* [What should be happening?] \n" +
"*Actual Outcome:* [What is happening instead?] \n\n" +
"{color:#d04437}##Please add any available screenshots##{color}```";
                    slashCommand.replyPrivate(message, t);
                    return;
                    case "prime contract":
                    t = "_*Prime Contract*_\n" +
"```*Context:* [What is happening?]\n" + 
"*Scope:*\n" + 
"* Has this been tested on multiple browsers? [Yes/No - Which browsers]: \n" +
"* Has this been tested in multiple projects? [Yes/No - Links to projects tested in] \n" +
"* Has this been tested in multiple companies? [Yes/No - Names of companies] \n\n" +
"*Expected Outcome:* [What should be happening?] \n" +
"*Actual Outcome:* [What is happening instead?] \n" +
"*Steps to Recreate:* \n" +
"# Add link here \n" +
"# ... \n\n" +
"*Additional Information:* \n" +
"*Workaround:* [Is there a reliable workaround being recommended to users?]  \n" +
"*404/500 Error:* [Yes/No - Attach screenshot with address bar included if yes] \n" +
"*Console Error:* [Yes/No - Attach screenshot if yes] \n```";
                    slashCommand.replyPrivate(message, t);
                    return;
                    case "auto file ticket":
                    t = "Auto File JIRA: http://bit.ly/20Ms6AK";
                    slashCommand.replyPrivate(message, t);
                    return;
                default:
                slashCommand.replyPrivate(message, "I don't under stand that");
                return;
            }

            // If we made it here, just echo what the user typed back at them
            //TODO You do it!
            slashCommand.replyPrivate(message, "1", function() {
                slashCommand.replyPublicDelayed(message, "2").then(slashCommand.replyPublicDelayed(message, "3"));
            });

            break;
        default:
            slashCommand.replyPrivate(message, "I'm afraid I don't know how to " + message.command + " yet.");

    }

})
;

// Test update
