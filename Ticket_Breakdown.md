# Ticket Breakdown
We are a staffing company whose primary purpose is to book Agents at Shifts posted by Facilities on our platform. We're working on a new feature which will generate reports for our client Facilities containing info on how many hours each Agent worked in a given quarter by summing up every Shift they worked. Currently, this is how the process works:

- Data is saved in the database in the Facilities, Agents, and Shifts tables
- A function `getShiftsByFacility` is called with the Facility's id, returning all Shifts worked that quarter, including some metadata about the Agent assigned to each
- A function `generateReport` is then called with the list of Shifts. It converts them into a PDF which can be submitted by the Facility for compliance.

## You've been asked to work on a ticket. It reads:

**Currently, the id of each Agent on the reports we generate is their internal database id. We'd like to add the ability for Facilities to save their own custom ids for each Agent they work with and use that id when generating reports for them.**


Based on the information given, break this ticket down into 2-5 individual tickets to perform. Provide as much detail for each ticket as you can, including acceptance criteria, time/effort estimates, and implementation details. Feel free to make informed guesses about any unknown details - you can't guess "wrong".


You will be graded on the level of detail in each ticket, the clarity of the execution plan within and between tickets, and the intelligibility of your language. You don't need to be a native English speaker, but please proof-read your work.

## Your Breakdown Here

- Ticket 001: Update database to include custom_id field for Agents 

Team: Back-end

Description: 
Create a unique field 'custom_id' in the Agents table, that will be used for the Facilities to generate custom ids for each Agent they work with.
The field type will be a Nullable String with 16 characters.
Add this field in the add/update requests and create a new request GetAgentByCustomId so the Front-end can verify if there’s already an Agent with that custom_id.

Acceptance Criteria: 
Before saving the custom id, verify if there's already one in the database, they must be unique. Do not accept otherwise. In case of an empty custom id, the original id will be used. Maximum characters is 16.

Time Effort: 4 hours


- Ticket 002: Modify requests GetShiftsByFacility, GenerateReport to include Agent’s custom id

Team: Back-end

Description: Modify requests GetShiftsByFacility, GenerateReport to include Agent’s custom id information.

Acceptance Criteria: If the custom_id is null, display ‘N/A’.

Time Effort: 2 hours


- Ticket 003: Change Agent form to include custom_id when adding/editing Agents.

Team: Front-end

Possible blocking: Verify with BE team if GetAgentByCustomId is ready for use (Ticket 001).

Description: Modify Agent form to include custom_id field when adding/editing Agents.

Acceptance Criteria: The field can be empty (in that case, what will be used is the original id), but if something is typed, verify with the GetAgentByCustomId request if there’s already an Agent with that custom_id. If verification succeeds, add field in the update/add request. Maximum characters is 16 and only number, letters, hyphen and underscore should be accepted.

Time Effort: 8 hours

Implementation Details: If there is already an Agent with that custom_id, display an error message saying “Custom Id already in use. Please try another one or click the ‘Generate Custom Id’ button.”. Also, create a button with the label ‘Generate Custom Id’, which will generate a custom_id with the uuid format, also verifying if that id is already in use.


- Ticket 004: Include custom_id in reports

Team: Front-end

Description: Include Agents in the getShiftsByFacility, generateReport request to add the custom_id for each Agent. Modify the PDF generation to include that field instead of the database id.

Acceptance Criteria: If custom_id is ‘N/A’, display database id.

Time Effort: 4 hours