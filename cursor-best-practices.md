# Cursor AI Best Practice Guide
## Your Complete Reference for Building Applications with AI

This guide will help you build better applications in Cursor by following proven best practices. Save this document and refer to it whenever you start a new project.

---

## Table of Contents
1. [Project Setup](#project-setup)
2. [Creating Your .cursorrules File](#creating-your-cursorrules-file)
3. [The Build-Test-Save Workflow](#the-build-test-save-workflow)
4. [Understanding Cursor Modes](#understanding-cursor-modes)
5. [Context Management](#context-management)
6. [Effective Prompting Strategies](#effective-prompting-strategies)
7. [Common Mistakes to Avoid](#common-mistakes-to-avoid)
8. [File Organization](#file-organization)
9. [Testing and Quality](#testing-and-quality)
10. [Quick Reference Checklist](#quick-reference-checklist)

---

## Project Setup

### Before You Start Coding

**Step 1: Set Up Version Control**
- Always use Git from day one
- Commit frequently (every 15-30 minutes)
- This lets you easily undo AI changes that don't work
- Create a new branch before making big changes

**Step 2: Create Your Project Folder Structure**
- Ask Cursor to create a basic folder structure first
- Example prompt: "Create a folder structure for a React app with TypeScript, including folders for components, services, types, and utils"
- Review and approve the structure before adding code

**Step 3: Create a Requirements Document**
- Write down what your app should do in simple language
- Include:
  - What problem it solves
  - Who will use it
  - Main features (list 3-5 to start)
  - What tech you want to use (React, Python, etc.)
- Save this as `requirements.md` in your project root

**Example Requirements Document:**
```markdown
# My App Requirements

## Purpose
A simple to-do list app that helps people organize their daily tasks.

## Users
People who want to track their tasks on their phone or computer.

## Main Features
1. Add new tasks with a title and description
2. Mark tasks as complete
3. Delete tasks
4. See all tasks in a list
5. Save tasks so they don't disappear when you close the app

## Technology
- React for the frontend
- TypeScript for type safety
- Local storage to save data
```

---

## Creating Your .cursorrules File

The `.cursorrules` file tells Cursor how to write code for your specific project. Think of it as instructions that apply to everything Cursor builds.

### Where to Put It
- Create a file named `.cursorrules` in your project's main folder
- Put it at the same level as your package.json or README file

### What to Include

Keep your rules simple and focused. Here's a template you can customize:

```markdown
# Project Rules for Cursor AI

## Core Instructions
- Never replace code with comments like "// rest of code here"
- Always write complete code, not placeholders
- Break problems into small steps and solve them one at a time
- Explain what you're doing before making changes

## Code Style
- Use TypeScript (not JavaScript)
- Add type definitions to all functions
- Write descriptive variable names (use full words, not abbreviations)
- Add comments to explain complex logic

## Framework and Libraries
- React 18 with functional components
- Use hooks (useState, useEffect, etc.)
- No class components
- Use Tailwind CSS for styling

## File Organization
- Each component goes in its own folder
- Keep components under 300 lines
- Put reusable logic in the /utils folder
- Types go in /types folder

## Testing
- Write tests for all business logic
- Use Jest for unit tests
- Test both success and error cases

## Error Handling
- Always add try-catch blocks for async operations
- Show user-friendly error messages
- Log errors to the console for debugging

## What NOT to Do
- Don't use deprecated packages or methods
- Don't skip error handling
- Don't create files outside the project structure
- Don't change working code unless asked
```

### Tips for Your Rules File
1. **Start small** - Add 5-10 basic rules, not 50
2. **Update as you go** - If Cursor keeps making the same mistake, add a rule to fix it
3. **Be specific** - Instead of "write good code," say "add error handling to all API calls"
4. **Include your tech stack** - List the specific versions you're using

---

## The Build-Test-Save Workflow

This is the most important workflow to remember. Follow these three steps for every feature:

### Step 1: BUILD (Plan First, Code Second)

**Create a Feature Plan**
1. Open Composer mode (Cmd/Ctrl + I)
2. Describe what you want to build
3. Ask Cursor to create a plan first
4. Review the plan before any code is written

**Example Prompt:**
```
I want to add a login feature to my app. Before writing code, please:
1. List all the files we'll need to create or modify
2. Describe the steps to implement this feature
3. Identify any potential issues or dependencies
4. Save this plan in a file called login-feature-plan.md
```

**Review the Plan**
- Read through Cursor's plan carefully
- Make sure it includes everything you need
- Check that it won't break existing features
- Spend time here - a good plan saves hours of fixing later

**Start Building**
- Once the plan looks good, tell Cursor: "This plan looks good, please implement it step by step"
- Or break it into phases: "Start with Step 1 from the plan"

### Step 2: TEST (Check Everything Works)

**Test in Your Browser/App**
- Run your app after each change
- Click buttons, fill in forms, try to break it
- Test on different screen sizes if it's a web app

**Check for Errors**
- Look at the browser console (F12)
- Check the terminal for error messages
- If there are errors, copy them and paste into Cursor: "I got this error: [paste error]. Please fix it."

**Test Edge Cases**
- What happens with empty inputs?
- What if the user clicks the button twice?
- What if the internet is slow?

### Step 3: SAVE (Protect Your Work)

**Commit to Git**
```bash
git add .
git commit -m "Added login feature"
```

**Make Copies as Backup**
- Before making big changes, save a copy of your project folder
- Or create a new Git branch: `git checkout -b new-feature`

**Document What You Did**
- Add notes to your requirements.md file
- Write down what works and what's left to do

---

## Understanding Cursor Modes

Cursor has different modes for different tasks. Here's when to use each:

### Chat Mode (Cmd/Ctrl + L)
**Use it for:**
- Asking questions about your code
- Getting explanations: "What does this function do?"
- Small, specific fixes: "Fix this bug in line 25"
- Learning: "How does async/await work?"

**Don't use it for:**
- Building entire features (use Composer/Agent instead)
- Making changes across multiple files

### Composer Mode (Cmd/Ctrl + I)
**Use it for:**
- Building new features
- Making changes to multiple files at once
- Refactoring code
- Setting up new components

**How to use it:**
- Open Composer
- Describe what you want to build
- Review the proposed changes
- Accept or reject each change

### Agent Mode
**Use it for:**
- Complex features that span many files
- Tasks that need terminal commands (installing packages, running migrations)
- When you want more autonomy

**Important:**
- Agent mode makes changes automatically
- Review checkpoints carefully
- You can restore previous checkpoints if something goes wrong

**Which Mode Should You Use?**
- **Starting out?** Use Composer mode - it's the sweet spot
- **Quick question?** Use Chat mode
- **Experienced and need speed?** Try Agent mode

---

## Context Management

Context is information Cursor uses to understand your project. Too much context confuses it. Too little and it doesn't know what you want.

### How to Give Good Context

**Use @ Mentions**
- `@filename.ts` - Include a specific file
- `@foldername` - Include all files in a folder
- `@docs` - Include documentation links

**Only Include Relevant Files**
- Close tabs you're not working on
- Only @ mention files related to your current task
- Don't include your entire project

**Example of Good Context:**
```
I want to add a delete button to the TaskCard component.

@TaskCard.tsx @TaskList.tsx @api/tasks.ts

The button should:
1. Show a confirmation dialog
2. Call the delete API
3. Remove the task from the list
```

### Keep Conversations Short
- Start a new chat after completing each feature
- Long conversations lose focus and quality drops
- If you've been chatting for 20+ messages, start fresh

### Project Documentation
Create a `README.md` that explains:
- What your app does
- How to run it locally
- Folder structure
- Key files and their purpose

Cursor can read this to understand your project better.

---

## Effective Prompting Strategies

The way you ask Cursor to do something makes a huge difference in the results.

### Be Specific, Not Vague

**Bad Prompt:**
"Make the app better"

**Good Prompt:**
"Add loading spinners to all buttons when they're waiting for API responses. Use the Spinner component from /components/common and show it when isLoading is true."

### Include Examples

**Bad Prompt:**
"Add validation to the form"

**Good Prompt:**
"Add validation to the registration form:
- Email must be in valid format (user@domain.com)
- Password must be at least 8 characters
- Username must be 3-20 characters, letters and numbers only
Show error messages in red text below each field, like this: 'Email is invalid'"

### Break Down Big Tasks

**Instead of:**
"Build a complete user authentication system"

**Do this:**
1. "Create a login form with email and password fields"
2. (Test it)
3. "Add API call to authenticate user"
4. (Test it)
5. "Add token storage to keep user logged in"
6. (Test it)

### Ask for Explanations

"Please explain what this code does before implementing it"
"Why did you choose this approach?"
"What are the potential problems with this solution?"

### Provide Constraints

Tell Cursor what NOT to do:
- "Don't change the existing user model"
- "Must work on mobile screens"
- "Keep the current color scheme"
- "Don't use external libraries"

### Use the Q&A Strategy

Before building, have a conversation:
```
User: I want to add a payment system
Cursor: What payment provider will you use?
User: Stripe
Cursor: Do you need one-time payments, subscriptions, or both?
User: Just one-time payments for now
Cursor: Should we save payment methods for future use?
User: No, just process the payment
```

This alignment prevents building the wrong thing.

---

## Common Mistakes to Avoid

Learn from others' mistakes:

### ❌ Mistake 1: Building Everything at Once
**What happens:** You get incomplete code that doesn't work

**Solution:** Build one small feature at a time

### ❌ Mistake 2: Not Using Git
**What happens:** You can't undo bad changes

**Solution:** Commit every 15-30 minutes

### ❌ Mistake 3: Trusting AI Blindly
**What happens:** You get code with bugs or security issues

**Solution:** Always review and test AI-generated code

### ❌ Mistake 4: Vague Prompts
**What happens:** Cursor creates random code that doesn't match your needs

**Solution:** Be specific about what you want

### ❌ Mistake 5: Adding Too Much Context
**What happens:** Cursor gets confused and makes wrong assumptions

**Solution:** Only include relevant files (3-5 files max)

### ❌ Mistake 6: Not Creating Rules
**What happens:** Cursor uses different styles and makes the same mistakes

**Solution:** Create a `.cursorrules` file from day one

### ❌ Mistake 7: Long Chat Sessions
**What happens:** Quality degrades, Cursor loses focus

**Solution:** Start new chats for new features

### ❌ Mistake 8: Skipping the Plan Phase
**What happens:** Cursor builds the wrong thing or creates messy code

**Solution:** Always ask for a plan first, review it, then implement

---

## File Organization

Good organization helps Cursor understand your project better.

### Keep Files Small
- Components: under 300 lines
- If a file is too big, break it into smaller pieces
- Cursor reads the first 250 lines carefully - put important stuff at the top

### Use Clear Folder Structure

**For React Apps:**
```
/src
  /components
    /common       (reusable components like Button, Input)
    /features     (feature-specific components)
  /services       (API calls, external integrations)
  /utils          (helper functions)
  /types          (TypeScript types)
  /hooks          (custom React hooks)
  /styles         (global styles)
```

### Name Files Clearly
- `UserProfile.tsx` not `up.tsx`
- `authService.ts` not `service.ts`
- Use the same naming pattern throughout

### Include File Headers
Add a comment at the top of each file:
```typescript
/**
 * UserProfile.tsx
 * Displays user profile information and allows editing
 * Used in: /settings page
 */
```

This helps Cursor understand what each file does.

---

## Testing and Quality

### Write Tests Along the Way
Don't wait until the end. Ask Cursor:
```
"Create Jest tests for this component. Test:
1. It renders correctly
2. Button click calls the right function
3. Error states show error messages"
```

### Use TypeScript
- Catches errors before you run the code
- Helps Cursor understand your data structures
- Makes code easier to maintain

### Add Error Handling
Always handle errors:
```typescript
try {
  await saveData()
} catch (error) {
  console.error('Failed to save:', error)
  showErrorMessage('Could not save. Please try again.')
}
```

### Code Reviews
Even though AI wrote it, review the code:
- Does it make sense?
- Are there security issues?
- Is it easy to understand?
- Does it handle errors?

---

## Quick Reference Checklist

### Starting a New Project
- [ ] Create Git repository
- [ ] Create requirements.md
- [ ] Create .cursorrules file
- [ ] Set up basic folder structure
- [ ] Make first commit

### Building a New Feature
- [ ] Ask Cursor to create a plan
- [ ] Review and approve the plan
- [ ] Implement step by step
- [ ] Test after each step
- [ ] Commit when it works

### Before Each Coding Session
- [ ] Close unnecessary tabs
- [ ] Clear your mind about what you want to build
- [ ] Have your requirements document handy
- [ ] Make sure Git is up to date

### During Coding
- [ ] Use specific prompts
- [ ] Include relevant files with @
- [ ] Review changes before accepting
- [ ] Test frequently
- [ ] Commit working code

### After Each Feature
- [ ] Test thoroughly
- [ ] Update requirements.md
- [ ] Commit to Git
- [ ] Start a new chat for the next feature

### Weekly Maintenance
- [ ] Review and update .cursorrules
- [ ] Clean up unused files
- [ ] Update documentation
- [ ] Review code quality

---

## Sample Prompts for Common Tasks

### Creating a New Component
```
Create a reusable Button component in /components/common.

Requirements:
- Accept props: text, onClick, variant (primary/secondary), disabled
- Primary variant: blue background, white text
- Secondary variant: white background, blue text
- Disabled: gray background, can't be clicked
- Use TypeScript with proper prop types
- Include hover and active states
```

### Adding an API Call
```
Create a function to fetch user data from the API.

@api/client.ts (for the base API setup)

Function should:
- Be named getUserById
- Take userId as a parameter
- Make a GET request to /api/users/{userId}
- Return the user object or null if not found
- Handle errors and log them
- Include TypeScript types for the user object
```

### Refactoring Code
```
This component is too long. Please refactor it into smaller pieces.

@UserProfile.tsx

Split it into:
1. UserInfo.tsx - displays user's basic info
2. UserSettings.tsx - handles settings
3. UserStats.tsx - shows statistics

Keep the same functionality but organize better.
```

### Fixing a Bug
```
I'm getting this error: [paste error message]

It happens when I click the submit button.

@FormComponent.tsx @formValidation.ts

Please:
1. Explain what's causing the error
2. Provide a fix
3. Add error handling to prevent it in the future
```

---

## Remember These Key Principles

1. **Start Small:** Build tiny features, test them, then build more
2. **Plan First:** Always create a plan before coding
3. **Test Often:** Test after every change, not at the end
4. **Save Frequently:** Commit to Git every 15-30 minutes
5. **Be Specific:** Clear prompts get better results
6. **Review Everything:** Never trust AI code blindly
7. **Use Rules:** .cursorrules file keeps quality consistent
8. **Stay Organized:** Clean code structure helps both you and AI
9. **Ask Questions:** If you don't understand, ask Cursor to explain
10. **Iterate:** First version doesn't need to be perfect

---

## Getting Help

If Cursor isn't understanding you:
1. Simplify your prompt
2. Provide an example of what you want
3. Include relevant files with @
4. Ask it to explain its approach first

If code isn't working:
1. Copy the error message
2. Paste it into Cursor with context
3. Test the fix
4. If still broken, start a new chat and explain from the beginning

If you're stuck:
1. Take a break
2. Review the plan
3. Ask Cursor "What are the steps to achieve [goal]?"
4. Break it into smaller pieces

---

## Next Steps

1. **Save this document** in your project root as `cursor-guide.md`
2. **Create your first .cursorrules file** using the template above
3. **Start your next feature** using the Build-Test-Save workflow
4. **Reference this guide** whenever you're unsure

Remember: Building with AI is a skill. You'll get better with practice. Start small, be patient, and keep this guide handy!

---

**Version:** 1.0  
**Last Updated:** November 2025  
**Keep this file updated as you learn new best practices!**
