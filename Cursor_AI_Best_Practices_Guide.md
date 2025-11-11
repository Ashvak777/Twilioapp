
# 🚀 Cursor AI Best Practices Guide

Your complete reference for building and managing projects effectively in Cursor IDE.

---

## 1️⃣ Project Setup

- Use **Git** from day one. Commit every 15–30 minutes.
- Create a `requirements.md` explaining:
  - What your app does
  - Who will use it
  - Main features (3–5 to start)
  - Tech stack (React, Python, etc.)
- Ask Cursor to generate a base folder structure before adding code.
- Review and confirm the structure.

---

## 2️⃣ `.cursorrules` File Template

```markdown
# Project Rules for Cursor AI

## Core Instructions
- Always write full code (no placeholders).
- Break down tasks into small, testable steps.
- Explain before implementing.

## Code Style
- Use TypeScript with React functional components.
- Add comments for complex logic.
- Use Tailwind CSS for styling.

## File Organization
- Each component in its own folder.
- Keep components under 300 lines.
- Reusable logic → /utils folder.
- Types → /types folder.

## Testing
- Generate Jest tests for each component.
- Validate and handle errors gracefully.
```

Place this file in your project root beside `package.json`.

---

## 3️⃣ Understanding Cursor Modes

| Mode | Use Case | Tip |
|------|-----------|-----|
| **Chat Mode** | Quick questions or explanations | "Why is this function not working?" |
| **Composer Mode** | Build or refactor features | "Add a login form using existing auth utils." |
| **Agent Mode** | Multi-file, complex changes | Review checkpoints carefully before approving. |

---

## 4️⃣ Context Management

- Only include **3–5 relevant files** using `@` mentions.
- Close unrelated tabs before working.
- Avoid sending your entire project as context.
- Keep chats short; restart for each new feature.

Example:
```text
Add a delete button to TaskCard component.

@TaskCard.tsx @TaskList.tsx @api/tasks.ts

The button should:
1. Show a confirmation dialog.
2. Call the delete API.
3. Remove the task from the list.
```

---

## 5️⃣ Prompting Strategies

### ❌ Bad Prompt
> "Add validation to the form"

### ✅ Good Prompt
> "Add validation to the registration form:
> - Email must be in valid format
> - Password must be at least 8 characters
> Show errors below each field in red text"

**Tips:**
- Be specific and include examples.
- Use constraints like: “Don’t change the color scheme.”
- Have short Q&A conversations before coding to clarify needs.

---

## 6️⃣ Common Mistakes to Avoid

| Mistake | Fix |
|----------|-----|
| Building everything at once | Build small, test, expand |
| Not using Git | Commit frequently |
| Trusting AI blindly | Always review and test code |
| Vague prompts | Be clear and detailed |
| Too much context | Keep to 3–5 files |
| No `.cursorrules` | Create it early |
| Long chats | Restart after 20+ turns |
| No planning | Always ask for a plan first |

---

## 7️⃣ Quality & Testing

- Write tests early (Jest or PyTest).
- Always wrap async functions in `try...catch`.
- Use TypeScript for stronger data validation.
- Review every AI-generated file manually.
- Keep a checklist for testing before commits.

```typescript
try {
  await saveData();
} catch (error) {
  console.error('Save failed:', error);
  showError('Please try again later.');
}
```

---

## 8️⃣ Build-Test-Save Workflow

1. **Build:** Ask for a plan and implement step by step.  
2. **Test:** Validate each change immediately.  
3. **Save:** Commit your progress frequently.

---

## ✅ Quick Reference Checklist

- [ ] `.cursorrules` created
- [ ] Git repo initialized
- [ ] Requirements documented
- [ ] Folder structure reviewed
- [ ] Each component < 300 lines
- [ ] Jest tests for all components
- [ ] Regular commits done

---

**Version:** 1.0  
**Last Updated:** November 2025  
**Keep updating this as you learn new Cursor techniques!**
