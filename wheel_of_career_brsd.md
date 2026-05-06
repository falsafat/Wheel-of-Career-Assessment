# Business Requirements Specification Document
# Wheel of Career Assessment Webpage

## 1. Document Information

| Item | Details |
|---|---|
| Document Title | Wheel of Career Assessment Webpage |
| Document Type | Business Requirements Specification Document |
| Requesting Department | Digital Communication / Talent Development / HR, as applicable |
| Business Owner | To be confirmed |
| IT Owner | To be assigned by IT |
| Version | 1.0 |
| Date | To be added |
| Prepared By | Raed AlSaeed |
| Status | Draft |

---

## 2. Executive Summary

The business requires IT to develop a web-based assessment tool called the *Wheel of Career Assessment*. The webpage will allow employees to answer a structured 40-question multiple-choice assessment across 8 career dimensions. Upon completion, the system will automatically calculate the score for each dimension and generate a personalized visual *Wheel of Career*.

The purpose of the tool is to help employees reflect on their current career status, identify strengths and development areas, and support career coaching, mentoring, and development conversations.

The webpage should be simple, user-friendly, responsive, secure, and accessible through a standard web browser. The final output should provide the user with a visual wheel, section-level scores, interpretation, and recommended reflection prompts.

---

## 3. Business Background

Career development conversations are often subjective and unstructured. Employees may not always have a clear view of which areas of their professional life are strong and which require more attention.

The *Wheel of Career Assessment* provides a structured self-assessment framework that evaluates 8 key dimensions of career health:

1. Role Clarity
2. Performance & Impact
3. Skills & Capability
4. Career Growth
5. Leadership & Influence
6. Network & Relationships
7. Compensation & Recognition
8. Workload & Sustainability

Each dimension is measured through 5 multiple-choice questions, creating a total of 40 questions. The tool converts the responses into a score from 1 to 10 for each dimension and displays the results in a visual wheel format.

This will help employees and mentors have more meaningful, data-informed career development discussions.

---

## 4. Business Objectives

The main objectives of the webpage are to:

1. Provide employees with a simple and structured career self-assessment experience.
2. Automatically calculate scores for each career dimension.
3. Generate a personalized *Wheel of Career* visual based on assessment results.
4. Help employees identify career strengths and development gaps.
5. Support mentoring, coaching, and performance development conversations.
6. Provide a downloadable or shareable summary report.
7. Enable future enhancement for dashboards, analytics, and integration with internal HR systems if required.

---

## 5. Scope of Work

### 5.1 In Scope

The requested solution should include:

1. A landing page explaining the purpose of the assessment.
2. A 40-question multiple-choice assessment.
3. 8 clearly separated career sections.
4. Progress indicator showing assessment completion status.
5. Automatic score calculation for each section.
6. Personalized *Wheel of Career* visual output.
7. Section-by-section score summary.
8. Interpretation guide based on score ranges.
9. Personalized development insights.
10. Option to download the results as PDF.
11. Option to retake the assessment.
12. Responsive design for desktop, tablet, and mobile.
13. Basic admin capability to edit questions and scoring text, if feasible.
14. Data privacy notice and consent message.
15. Optional result saving, depending on business approval.

### 5.2 Out of Scope for Phase 1

The following items are not required in the first release unless approved separately:

1. Integration with HR systems.
2. Manager dashboard.
3. Employee historical comparison over time.
4. Single Sign-On integration, unless mandated by IT policy.
5. Advanced analytics dashboard.
6. Automated development plan assignment.
7. AI-generated coaching recommendations.
8. Multilingual support beyond English, unless requested.
9. Email notification workflow.
10. Benchmarking against other employees or departments.

---

## 6. Target Users

| User Type | Description |
|---|---|
| Employee | Completes the assessment and receives a personalized Wheel of Career result. |
| Mentor / Coach | Uses the result as input for coaching or mentoring discussions. |
| HR / Talent Development Team | Owns the framework and may use aggregated insights in future phases. |
| Admin User | Maintains questions, labels, and interpretation text if admin capability is included. |
| IT Support | Maintains the technical solution and resolves incidents. |

---

## 7. User Journey

### 7.1 Employee Journey

1. Employee opens the Wheel of Career webpage.
2. Employee reads the assessment introduction and purpose.
3. Employee agrees to the privacy and usage notice.
4. Employee starts the assessment.
5. Employee answers 40 multiple-choice questions.
6. Employee can see progress throughout the assessment.
7. Employee submits the assessment.
8. System validates that all questions are answered.
9. System calculates the scores for the 8 career sections.
10. System generates a personalized Wheel of Career visual.
11. Employee reviews:
    - Overall wheel
    - Section scores
    - Interpretation of scores
    - Development reflection prompts
12. Employee can download the result as PDF.
13. Employee may retake the assessment.

---

## 8. Functional Requirements

## FR-01: Landing Page

The system shall provide a landing page introducing the Wheel of Career Assessment.

### Landing Page Content

The page should include:

1. Assessment title: *Wheel of Career Assessment*
2. Short description of the purpose.
3. Explanation that the assessment includes 40 questions.
4. Explanation that results are generated across 8 career dimensions.
5. Estimated completion time, for example: 8 to 12 minutes.
6. Start Assessment button.
7. Privacy and usage note.

### Acceptance Criteria

| ID | Acceptance Criteria |
|---|---|
| FR-01-AC01 | User can access the landing page through a web browser. |
| FR-01-AC02 | Landing page clearly explains the purpose of the assessment. |
| FR-01-AC03 | User can start the assessment from the landing page. |
| FR-01-AC04 | Page should be responsive on desktop, tablet, and mobile. |

---

## FR-02: Assessment Structure

The system shall present 40 multiple-choice questions grouped into 8 sections.

### Sections

| Section No. | Section Name | Number of Questions |
|---:|---|---:|
| 1 | Role Clarity | 5 |
| 2 | Performance & Impact | 5 |
| 3 | Skills & Capability | 5 |
| 4 | Career Growth | 5 |
| 5 | Leadership & Influence | 5 |
| 6 | Network & Relationships | 5 |
| 7 | Compensation & Recognition | 5 |
| 8 | Workload & Sustainability | 5 |

### Answer Options

Each question shall have 5 answer options:

| Option | Score |
|---|---:|
| A | 1 |
| B | 2 |
| C | 3 |
| D | 4 |
| E | 5 |

### Acceptance Criteria

| ID | Acceptance Criteria |
|---|---|
| FR-02-AC01 | System displays all 40 questions. |
| FR-02-AC02 | Questions are grouped by career section. |
| FR-02-AC03 | Each question has exactly 5 answer options. |
| FR-02-AC04 | Only one answer can be selected per question. |
| FR-02-AC05 | User cannot submit until all required questions are answered. |

---

## FR-03: Question Content

The system shall use the following approved assessment questions.

### Section 1: Role Clarity

#### Q1. I clearly understand what is expected from me in my current role.

A. Not clear at all  
B. Slightly clear  
C. Moderately clear  
D. Mostly clear  
E. Completely clear  

#### Q2. I understand how my role contributes to the broader goals of the organization.

A. I do not understand the connection  
B. I have limited understanding  
C. I understand some of the connection  
D. I understand it well  
E. I understand it very clearly  

#### Q3. My responsibilities and decision-making authority are clearly defined.

A. Not defined  
B. Poorly defined  
C. Somewhat defined  
D. Mostly defined  
E. Very clearly defined  

#### Q4. I know which priorities matter most in my role.

A. I am often unsure  
B. I have limited clarity  
C. I know some priorities  
D. I know most priorities  
E. I have full clarity  

#### Q5. My manager or stakeholders provide clear direction when needed.

A. Almost never  
B. Rarely  
C. Sometimes  
D. Often  
E. Consistently  

### Section 2: Performance & Impact

#### Q6. I deliver results that clearly contribute to business outcomes.

A. Rarely  
B. Occasionally  
C. Sometimes  
D. Often  
E. Consistently  

#### Q7. My work has measurable impact.

A. Not measurable  
B. Limited measurable impact  
C. Some measurable impact  
D. Strong measurable impact  
E. Highly measurable and visible impact  

#### Q8. I consistently meet or exceed my performance objectives.

A. Almost never  
B. Rarely  
C. Sometimes  
D. Often  
E. Consistently  

#### Q9. I focus my effort on work that creates real value.

A. Almost never  
B. Rarely  
C. Sometimes  
D. Often  
E. Consistently  

#### Q10. My achievements are visible to relevant stakeholders.

A. Not visible  
B. Slightly visible  
C. Moderately visible  
D. Mostly visible  
E. Highly visible  

### Section 3: Skills & Capability

#### Q11. I have the skills required to perform my current role effectively.

A. Significant gaps  
B. Some major gaps  
C. Adequate skills  
D. Strong skills  
E. Excellent skills  

#### Q12. I am actively developing new capabilities for future career needs.

A. Not at all  
B. Rarely  
C. Sometimes  
D. Often  
E. Continuously  

#### Q13. I keep myself updated on trends, tools, and practices relevant to my field.

A. Almost never  
B. Rarely  
C. Sometimes  
D. Often  
E. Consistently  

#### Q14. I receive or seek useful feedback to improve my capabilities.

A. Almost never  
B. Rarely  
C. Sometimes  
D. Often  
E. Consistently  

#### Q15. I can confidently handle complex challenges in my area of work.

A. Not confident  
B. Slightly confident  
C. Moderately confident  
D. Very confident  
E. Highly confident  

### Section 4: Career Growth

#### Q16. I have a clear view of my next career step.

A. Not clear at all  
B. Slightly clear  
C. Moderately clear  
D. Mostly clear  
E. Very clear  

#### Q17. I understand what is required to progress to the next level.

A. I do not understand  
B. I have limited understanding  
C. I understand some requirements  
D. I understand most requirements  
E. I understand clearly  

#### Q18. I am getting opportunities that prepare me for future roles.

A. Almost never  
B. Rarely  
C. Sometimes  
D. Often  
E. Consistently  

#### Q19. I feel my career is progressing at a healthy pace.

A. Not progressing  
B. Progressing slowly  
C. Progressing moderately  
D. Progressing well  
E. Progressing strongly  

#### Q20. I have meaningful development conversations about my career.

A. Almost never  
B. Rarely  
C. Sometimes  
D. Often  
E. Regularly and effectively  

### Section 5: Leadership & Influence

#### Q21. I am trusted by others to lead or influence important work.

A. Rarely trusted  
B. Sometimes trusted  
C. Moderately trusted  
D. Often trusted  
E. Highly trusted  

#### Q22. I can influence decisions beyond my direct responsibilities.

A. Almost never  
B. Rarely  
C. Sometimes  
D. Often  
E. Consistently  

#### Q23. I communicate my ideas with clarity and confidence.

A. Not confidently  
B. Slightly confidently  
C. Moderately confidently  
D. Very confidently  
E. Highly confidently  

#### Q24. I demonstrate ownership and accountability in my work.

A. Almost never  
B. Rarely  
C. Sometimes  
D. Often  
E. Consistently  

#### Q25. I am seen as someone who can guide, support, or inspire others.

A. Almost never  
B. Rarely  
C. Sometimes  
D. Often  
E. Consistently  

### Section 6: Network & Relationships

#### Q26. I have strong working relationships with key stakeholders.

A. Very weak  
B. Somewhat weak  
C. Moderate  
D. Strong  
E. Very strong  

#### Q27. I have access to mentors, sponsors, or trusted advisors.

A. No access  
B. Limited access  
C. Some access  
D. Good access  
E. Strong access  

#### Q28. I collaborate effectively with colleagues across teams.

A. Almost never  
B. Rarely  
C. Sometimes  
D. Often  
E. Consistently  

#### Q29. I maintain a professional network that supports my growth.

A. Not at all  
B. Limited network  
C. Moderate network  
D. Strong network  
E. Very strong network  

#### Q30. People are willing to support me when I need help or alignment.

A. Almost never  
B. Rarely  
C. Sometimes  
D. Often  
E. Consistently  

### Section 7: Compensation & Recognition

#### Q31. I feel fairly compensated for my contribution.

A. Strongly disagree  
B. Disagree  
C. Neutral  
D. Agree  
E. Strongly agree  

#### Q32. My contributions are recognized by my manager or stakeholders.

A. Almost never  
B. Rarely  
C. Sometimes  
D. Often  
E. Consistently  

#### Q33. I feel appreciated for the value I bring.

A. Not appreciated  
B. Slightly appreciated  
C. Moderately appreciated  
D. Well appreciated  
E. Highly appreciated  

#### Q34. Rewards, promotions, or recognition feel aligned with performance.

A. Not aligned  
B. Slightly aligned  
C. Moderately aligned  
D. Mostly aligned  
E. Strongly aligned  

#### Q35. I receive recognition in ways that motivate me.

A. Almost never  
B. Rarely  
C. Sometimes  
D. Often  
E. Consistently  

### Section 8: Workload & Sustainability

#### Q36. My workload is manageable.

A. Not manageable  
B. Slightly manageable  
C. Moderately manageable  
D. Mostly manageable  
E. Very manageable  

#### Q37. I can maintain good energy and focus throughout the workweek.

A. Almost never  
B. Rarely  
C. Sometimes  
D. Often  
E. Consistently  

#### Q38. My work allows enough time for recovery and personal wellbeing.

A. Almost never  
B. Rarely  
C. Sometimes  
D. Often  
E. Consistently  

#### Q39. I can deliver quality work without constant pressure or overload.

A. Almost never  
B. Rarely  
C. Sometimes  
D. Often  
E. Consistently  

#### Q40. My current work pace is sustainable over the long term.

A. Not sustainable  
B. Slightly sustainable  
C. Moderately sustainable  
D. Mostly sustainable  
E. Highly sustainable  

---

## FR-04: Assessment Progress Indicator

The system shall display progress during the assessment.

### Required Progress Elements

1. Current question number.
2. Total number of questions.
3. Current section name.
4. Percentage completed.
5. Visual progress bar.

### Acceptance Criteria

| ID | Acceptance Criteria |
|---|---|
| FR-04-AC01 | User can see how many questions remain. |
| FR-04-AC02 | Progress updates automatically when the user answers questions. |
| FR-04-AC03 | Progress is accurate and reflects answered questions. |

---

## FR-05: Score Calculation

The system shall automatically calculate scores based on selected answers.

### Scoring Rules

Each answer is assigned a score:

| Answer | Score |
|---|---:|
| A | 1 |
| B | 2 |
| C | 3 |
| D | 4 |
| E | 5 |

Each section includes 5 questions.

### Raw Section Score

```text
Raw Section Score = Sum of the 5 question scores in the section
```

Minimum raw score per section:

```text
5
```

Maximum raw score per section:

```text
25
```

### Wheel Score Formula

```text
Wheel Score = Raw Section Score ÷ 25 × 10
```

### Example

If the user scores 18 out of 25 in Career Growth:

```text
18 ÷ 25 × 10 = 7.2
```

The Career Growth wheel score is:

```text
7.2 out of 10
```

### Rounding Rule

The system shall round each wheel score to one decimal point.

Example:

```text
7.24 = 7.2
7.25 = 7.3
```

### Acceptance Criteria

| ID | Acceptance Criteria |
|---|---|
| FR-05-AC01 | System calculates a raw score for each section. |
| FR-05-AC02 | System converts raw score into a 10-point wheel score. |
| FR-05-AC03 | System rounds results to one decimal point. |
| FR-05-AC04 | Calculation logic must be consistent across all 8 sections. |

---

## FR-06: Wheel of Career Visual Output

The system shall generate a personalized Wheel of Career visual after assessment submission.

### Visual Requirements

The wheel should:

1. Be divided into 8 sections.
2. Display the name of each career dimension.
3. Use a 1 to 10 radial scale.
4. Plot the user’s score for each section.
5. Connect the plotted score points to create a personalized shape.
6. Use distinct colors for each section.
7. Display the score number for each section.
8. Be clear and readable on desktop and mobile.
9. Be downloadable as part of the PDF result.

### Suggested Wheel Sections

1. Role Clarity
2. Performance & Impact
3. Skills & Capability
4. Career Growth
5. Leadership & Influence
6. Network & Relationships
7. Compensation & Recognition
8. Workload & Sustainability

### Acceptance Criteria

| ID | Acceptance Criteria |
|---|---|
| FR-06-AC01 | Wheel is generated immediately after submission. |
| FR-06-AC02 | Wheel accurately reflects calculated scores. |
| FR-06-AC03 | Each section is clearly labeled. |
| FR-06-AC04 | Wheel is visually readable and responsive. |
| FR-06-AC05 | Wheel appears in the downloaded PDF report. |

---

## FR-07: Results Summary Page

The system shall display a results page after the user submits the assessment.

### Results Page Should Include

1. Personalized Wheel of Career visual.
2. Score table showing all 8 section scores.
3. Interpretation guide.
4. Section-level insights.
5. Reflection questions.
6. Download PDF button.
7. Retake assessment button.

### Score Table

| Section | Raw Score /25 | Wheel Score /10 | Interpretation |
|---|---:|---:|---|
| Role Clarity | Auto-generated | Auto-generated | Auto-generated |
| Performance & Impact | Auto-generated | Auto-generated | Auto-generated |
| Skills & Capability | Auto-generated | Auto-generated | Auto-generated |
| Career Growth | Auto-generated | Auto-generated | Auto-generated |
| Leadership & Influence | Auto-generated | Auto-generated | Auto-generated |
| Network & Relationships | Auto-generated | Auto-generated | Auto-generated |
| Compensation & Recognition | Auto-generated | Auto-generated | Auto-generated |
| Workload & Sustainability | Auto-generated | Auto-generated | Auto-generated |

### Acceptance Criteria

| ID | Acceptance Criteria |
|---|---|
| FR-07-AC01 | Results page appears after successful submission. |
| FR-07-AC02 | Results page displays all 8 scores. |
| FR-07-AC03 | Results page displays the personalized wheel. |
| FR-07-AC04 | User can download results as PDF. |
| FR-07-AC05 | User can retake the assessment. |

---

## FR-08: Score Interpretation

The system shall display an interpretation for each score.

### Interpretation Guide

| Wheel Score | Interpretation |
|---:|---|
| 8.0 to 10 | Strong and healthy area |
| 6.0 to 7.9 | Good, but can be improved |
| 4.0 to 5.9 | Needs attention |
| Below 4.0 | Priority development area |

### Interpretation Logic

| Condition | Output |
|---|---|
| Score >= 8.0 | Strong and healthy area |
| Score >= 6.0 and < 8.0 | Good, but can be improved |
| Score >= 4.0 and < 6.0 | Needs attention |
| Score < 4.0 | Priority development area |

### Acceptance Criteria

| ID | Acceptance Criteria |
|---|---|
| FR-08-AC01 | Each section score has an interpretation. |
| FR-08-AC02 | Interpretation matches the approved scoring guide. |
| FR-08-AC03 | Interpretation appears on the result page and PDF report. |

---

## FR-09: Personalized Insights

The system should provide brief personalized insights based on the user’s scores.

### Suggested Insight Logic

For each section:

#### If Score is 8.0 to 10

```text
This appears to be one of your stronger career areas. Continue maintaining this strength and consider using it to support others.
```

#### If Score is 6.0 to 7.9

```text
This area is generally healthy, but there may be opportunities to improve consistency, clarity, or impact.
```

#### If Score is 4.0 to 5.9

```text
This area may need focused attention. Consider discussing it with your manager, mentor, or coach.
```

#### If Score is below 4.0

```text
This appears to be a priority development area. It may require immediate reflection, support, and an action plan.
```

### Acceptance Criteria

| ID | Acceptance Criteria |
|---|---|
| FR-09-AC01 | System displays an insight for each section. |
| FR-09-AC02 | Insight is based on the section score range. |
| FR-09-AC03 | Insight text is professional, constructive, and non-judgmental. |

---

## FR-10: Reflection Questions

The system should provide reflection prompts to help the user take action after viewing the results.

### Suggested Reflection Questions

1. Which 2 areas scored the highest, and what helped make them strong?
2. Which 2 areas scored the lowest, and why?
3. What is one area I want to improve over the next 90 days?
4. What support do I need from my manager, mentor, or stakeholders?
5. What is one action I can start this week?
6. Which strength can I use to improve a weaker area?

### Acceptance Criteria

| ID | Acceptance Criteria |
|---|---|
| FR-10-AC01 | Reflection questions appear on the result page. |
| FR-10-AC02 | Reflection questions appear in the PDF report. |
| FR-10-AC03 | Questions are clear and action-oriented. |

---

## FR-11: PDF Download

The system shall allow the user to download a PDF report of the assessment result.

### PDF Report Should Include

1. Title: Wheel of Career Assessment Result
2. Date of completion
3. Personalized Wheel of Career visual
4. Score table
5. Interpretation guide
6. Personalized insights
7. Reflection questions
8. Optional disclaimer

### PDF File Naming Convention

Suggested format:

```text
wheel-of-career-result-YYYY-MM-DD.pdf
```

### Acceptance Criteria

| ID | Acceptance Criteria |
|---|---|
| FR-11-AC01 | User can click Download PDF from the result page. |
| FR-11-AC02 | PDF contains the wheel visual. |
| FR-11-AC03 | PDF contains all section scores. |
| FR-11-AC04 | PDF is readable and professionally formatted. |
| FR-11-AC05 | PDF can be downloaded on desktop and mobile browsers. |

---

## FR-12: Retake Assessment

The system shall allow users to retake the assessment.

### Expected Behavior

1. User clicks Retake Assessment.
2. System shows a confirmation message.
3. If user confirms, previous answers are cleared.
4. User returns to the first question or landing page.

### Acceptance Criteria

| ID | Acceptance Criteria |
|---|---|
| FR-12-AC01 | Retake button is available on the results page. |
| FR-12-AC02 | User is asked to confirm before clearing results. |
| FR-12-AC03 | System clears previous answers after confirmation. |
| FR-12-AC04 | User can complete the assessment again. |

---

## FR-13: Save and Resume, Optional

The system may allow the user to save progress and resume later if authentication or local browser storage is available.

### Options

| Option | Description |
|---|---|
| Browser Local Storage | Saves progress on the same browser and device only. |
| Authenticated Storage | Saves progress to the user profile if login is enabled. |
| No Save | User must complete the assessment in one session. |

### Recommendation for Phase 1

Use browser local storage if allowed by IT security policies. Otherwise, keep Phase 1 as a single-session assessment.

### Acceptance Criteria

| ID | Acceptance Criteria |
|---|---|
| FR-13-AC01 | If enabled, user progress is saved automatically. |
| FR-13-AC02 | User can resume from where they stopped. |
| FR-13-AC03 | User can clear saved progress. |
| FR-13-AC04 | Save behavior complies with privacy and IT security requirements. |

---

## FR-14: Admin Management, Optional

The system may include a basic admin panel to manage questions, answer options, section labels, and interpretation text.

### Admin Capabilities

1. View all questions.
2. Edit question text.
3. Edit answer options.
4. Edit section names.
5. Edit interpretation text.
6. Publish or unpublish assessment.
7. Preview assessment before publishing.

### Acceptance Criteria

| ID | Acceptance Criteria |
|---|---|
| FR-14-AC01 | Authorized admin can edit assessment content. |
| FR-14-AC02 | Unauthorized users cannot access admin features. |
| FR-14-AC03 | Changes are reflected on the assessment page after publishing. |
| FR-14-AC04 | System stores the latest published version. |

---

## 9. Non-Functional Requirements

## NFR-01: Usability

The webpage should be easy to use and require no training.

### Requirements

1. Simple and clean interface.
2. Clear instructions.
3. Minimal scrolling where practical.
4. Clear buttons and navigation.
5. Friendly and professional tone.
6. Mobile-friendly layout.

---

## NFR-02: Performance

The webpage should load and calculate results quickly.

### Requirements

| Requirement | Target |
|---|---:|
| Initial page load | Within 3 seconds under normal network conditions |
| Question navigation response | Less than 1 second |
| Score calculation | Immediate after submission |
| PDF generation | Within 5 seconds where technically feasible |

---

## NFR-03: Compatibility

The webpage should work on modern browsers.

### Supported Browsers

1. Google Chrome
2. Microsoft Edge
3. Safari
4. Firefox

### Devices

1. Desktop
2. Laptop
3. Tablet
4. Mobile

---

## NFR-04: Accessibility

The webpage should follow accessibility best practices.

### Requirements

1. Keyboard navigation support.
2. Sufficient color contrast.
3. Screen reader-friendly labels.
4. Clear form field labels.
5. Avoid relying on color alone to communicate meaning.
6. Responsive text sizing.
7. Alt text or accessible labels for charts and visual elements.

---

## NFR-05: Security

The solution must comply with IT security standards.

### Requirements

1. Secure hosting environment.
2. HTTPS enabled.
3. Protection against common web vulnerabilities.
4. Input validation.
5. Role-based access control if admin panel is implemented.
6. No unnecessary collection of personal data.
7. No exposure of user responses unless approved by business and privacy teams.

---

## NFR-06: Privacy

The assessment may include sensitive career-related reflections. Privacy must be considered.

### Requirements

1. Display a privacy notice before starting.
2. Explain whether results are saved or not.
3. If results are saved, explain who can access them.
4. Do not share individual results with managers or HR unless explicitly approved.
5. Avoid collecting employee identifiers unless required.
6. Comply with internal data privacy policies.

### Suggested Privacy Notice

```text
This assessment is designed for personal career reflection and development. Your responses will be used to generate your Wheel of Career result. Individual results will not be shared unless a formal data storage and access process is approved and clearly communicated.
```

---

## NFR-07: Branding and UI

The webpage should follow the organization’s approved digital design and brand guidelines.

### Requirements

1. Use approved brand colors, fonts, and components.
2. Ensure page layout is clean and professional.
3. Use consistent button styles.
4. Use clear section headers.
5. Ensure the wheel visual is polished and suitable for internal use.
6. Do not use informal visuals or cartoonish design unless approved.

---

## 10. Data Requirements

## 10.1 Data Captured

Depending on final privacy decision, the system may capture:

| Data Element | Required? | Notes |
|---|---|---|
| Assessment answers | Required for calculation | May be temporary only |
| Section scores | Required | Needed to generate result |
| Completion date | Recommended | Useful for PDF report |
| User name | Optional | Only if personalization is required |
| Employee ID | Optional | Only if integrated with HR or SSO |
| Department | Optional | Only for aggregate reporting if approved |
| PDF result | Optional | Generated for user download |

---

## 10.2 Data Storage Options

### Option 1: No Server-Side Storage

The system calculates scores in the browser and does not save results.

#### Pros

1. Stronger privacy.
2. Faster implementation.
3. Lower compliance complexity.

#### Cons

1. No historical tracking.
2. No dashboard.
3. User must download results manually.

### Option 2: Store Results Anonymously

The system stores scores without personal identifiers.

#### Pros

1. Can support aggregate insights.
2. Lower privacy risk than identifiable storage.

#### Cons

1. Cannot provide individual history.
2. Still requires privacy review.

### Option 3: Store Results Against User Profile

The system stores results linked to the authenticated employee.

#### Pros

1. Enables historical tracking.
2. Enables manager or mentor dashboards if approved.
3. Supports future development planning.

#### Cons

1. Higher privacy and governance requirements.
2. Requires authentication.
3. Requires clear access control and consent.

### Recommendation for Phase 1

For the first release, the recommended approach is *Option 1: No Server-Side Storage*, unless the business requires analytics or history tracking.

---

## 11. Business Rules

| Rule ID | Business Rule |
|---|---|
| BR-01 | Each question must have one selected answer before submission. |
| BR-02 | Each selected answer maps to a numeric score from 1 to 5. |
| BR-03 | Each section includes exactly 5 questions. |
| BR-04 | Raw section score is calculated by summing the 5 question scores. |
| BR-05 | Wheel score is calculated using: Raw Score ÷ 25 × 10. |
| BR-06 | Wheel score must be rounded to one decimal point. |
| BR-07 | Each section must display an interpretation based on the score range. |
| BR-08 | The wheel visual must reflect the calculated section scores. |
| BR-09 | User must be able to download results as PDF. |
| BR-10 | Results should not be stored unless approved by business, IT, and privacy stakeholders. |

---

## 12. UI and Page Requirements

## 12.1 Landing Page

### Components

1. Header
2. Assessment title
3. Short introduction
4. Assessment details
5. Privacy notice
6. Start Assessment button

---

## 12.2 Assessment Page

### Components

1. Section title
2. Question text
3. Multiple-choice answer options
4. Previous button
5. Next button
6. Progress bar
7. Save progress indicator, if enabled
8. Submit button on final question or final section

### Preferred Display Options

IT may choose one of the following:

| Option | Description |
|---|---|
| One question per screen | Best for focus and mobile usability |
| One section per screen | Shows 5 questions at a time |
| Full assessment page | All 40 questions on one page |

### Business Preference

The preferred approach is *one section per screen* because it balances usability, speed, and context.

---

## 12.3 Results Page

### Components

1. Results header
2. Completion date
3. Personalized Wheel of Career visual
4. Score table
5. Interpretation guide
6. Personalized insights
7. Reflection questions
8. Download PDF button
9. Retake assessment button

---

## 13. Wheel Visualization Requirements

The wheel visual should work as the main output of the assessment.

### Recommended Chart Type

A radar chart or polar chart is recommended.

### Chart Requirements

1. 8 axes, one for each career dimension.
2. Scale from 0 to 10.
3. Scores plotted on each axis.
4. Filled polygon shape showing the user’s career profile.
5. Labels displayed clearly.
6. Score values visible either on the chart or next to the chart.
7. Legend should not be required unless helpful.
8. Chart should render correctly in PDF.

### Suggested Colors

Each dimension may have a unique color. Final colors should follow brand guidelines.

Example:

| Section | Suggested Color |
|---|---|
| Role Clarity | Blue |
| Performance & Impact | Gold |
| Skills & Capability | Green |
| Career Growth | Orange |
| Leadership & Influence | Teal |
| Network & Relationships | Purple |
| Compensation & Recognition | Pink |
| Workload & Sustainability | Brown |

---

## 14. Result Interpretation Content

The following interpretation guide should be displayed.

| Wheel Score | Interpretation |
|---:|---|
| 8.0 to 10 | Strong and healthy area |
| 6.0 to 7.9 | Good, but can be improved |
| 4.0 to 5.9 | Needs attention |
| Below 4.0 | Priority development area |

---

## 15. Recommended Development Insights by Section

The system should display tailored insights for each section. The insight can be based on the score band.

### 15.1 Role Clarity

#### High Score

```text
You appear to have strong clarity about your role, expectations, and priorities. Continue aligning regularly with your manager and stakeholders to maintain this clarity.
```

#### Medium Score

```text
Your role clarity is generally good, but there may be areas where expectations, priorities, or decision rights can be sharpened.
```

#### Low Score

```text
Role clarity may need attention. Consider discussing your mandate, priorities, and decision rights with your manager.
```

### 15.2 Performance & Impact

#### High Score

```text
Your work appears to create clear and measurable impact. Continue focusing on outcomes that matter to the business.
```

#### Medium Score

```text
You are contributing value, but there may be opportunities to make your impact more measurable or more visible.
```

#### Low Score

```text
Performance and impact may need stronger focus. Consider clarifying your objectives and identifying the outcomes that matter most.
```

### 15.3 Skills & Capability

#### High Score

```text
You appear confident in your current capabilities and actively prepared for future needs. Continue investing in future-facing skills.
```

#### Medium Score

```text
Your capabilities are generally strong, but there may be specific skills that require further development.
```

#### Low Score

```text
Skills and capability may need focused development. Consider creating a learning plan for the capabilities most relevant to your role and future path.
```

### 15.4 Career Growth

#### High Score

```text
You appear to have a clear and healthy career growth path. Continue seeking opportunities that prepare you for your next step.
```

#### Medium Score

```text
Your career growth direction is forming, but additional clarity or development conversations may help.
```

#### Low Score

```text
Career growth may need attention. Consider discussing your next step, required competencies, and development opportunities with your manager or mentor.
```

### 15.5 Leadership & Influence

#### High Score

```text
You appear to have strong leadership presence and influence. Continue using this strength to guide work and support others.
```

#### Medium Score

```text
You have a foundation of leadership and influence, but there may be opportunities to increase visibility, ownership, or stakeholder impact.
```

#### Low Score

```text
Leadership and influence may need development. Consider opportunities to lead initiatives, communicate ideas, and build trust across stakeholders.
```

### 15.6 Network & Relationships

#### High Score

```text
You appear to have a strong professional network and healthy stakeholder relationships. Continue nurturing these relationships.
```

#### Medium Score

```text
Your relationships are generally healthy, but your network could be expanded or made more strategic.
```

#### Low Score

```text
Network and relationships may need focused attention. Consider identifying key stakeholders, mentors, or sponsors who can support your growth.
```

### 15.7 Compensation & Recognition

#### High Score

```text
You appear to feel fairly recognized and rewarded for your contribution. Continue documenting achievements and maintaining visibility.
```

#### Medium Score

```text
Recognition and rewards appear acceptable, but there may be room to improve visibility, feedback, or alignment with performance.
```

#### Low Score

```text
Compensation and recognition may need attention. Consider discussing expectations, achievements, and recognition with your manager through the appropriate channels.
```

### 15.8 Workload & Sustainability

#### High Score

```text
Your workload appears manageable and sustainable. Continue protecting your energy and maintaining healthy work practices.
```

#### Medium Score

```text
Your workload may be manageable most of the time, but there may be periods of pressure that require better prioritization or support.
```

#### Low Score

```text
Workload and sustainability may need immediate attention. Consider reviewing priorities, workload balance, and support mechanisms with your manager.
```

---

## 16. Reporting Requirements

## 16.1 Phase 1 Reporting

For Phase 1, reporting may be limited to the individual user’s own result.

### User-Level Report

The user should be able to view and download:

1. Wheel visual.
2. Section scores.
3. Interpretation.
4. Insights.
5. Reflection questions.

---

## 16.2 Future Reporting, Optional

If data storage is approved, future reporting may include:

1. Average score by department.
2. Average score by job level.
3. Most common development areas.
4. Improvement over time.
5. Participation rate.
6. Completion rate.
7. Anonymous aggregate trends.

Individual results should not be visible to managers or HR unless approved through a clear governance and consent process.

---

## 17. Notifications

No email or system notifications are required for Phase 1.

Optional future notifications may include:

1. Completion confirmation email.
2. PDF result sent to user.
3. Reminder to retake assessment after 6 months.
4. Mentor session preparation email.

---

## 18. Authentication Requirements

Authentication requirements depend on the selected data model.

### Option 1: Public/Internal Link Without Login

Suitable if no personal data is stored.

### Option 2: Single Sign-On

Suitable if results are stored against employee profile.

### Recommendation

For Phase 1, use internal access without storing identifiable results, subject to IT and security approval. If the page is hosted on an internal platform, access should be restricted to employees only.

---

## 19. Error Handling Requirements

The system shall provide clear error messages.

### Error Scenarios

| Scenario | Expected Message |
|---|---|
| User submits without answering all questions | Please answer all questions before submitting. |
| PDF generation fails | We could not generate your PDF. Please try again. |
| Chart fails to load | We could not display the wheel. Please refresh the page. |
| Session expires | Your session has expired. Please restart the assessment. |
| Network issue | Connection issue. Please check your network and try again. |

---

## 20. Content Management Requirements

If admin management is not included, IT should ensure questions and text are configurable in code or a structured content file.

### Preferred Content Structure

1. JSON file
2. CMS entry
3. Database table
4. Static configuration file

### Content Fields

| Field | Description |
|---|---|
| Section ID | Unique section identifier |
| Section Name | Career dimension name |
| Question ID | Unique question identifier |
| Question Text | The question shown to the user |
| Answer Label | A, B, C, D, E |
| Answer Text | Text shown to the user |
| Answer Score | Numeric score from 1 to 5 |

---

## 21. Technical Considerations for IT

IT should determine the best technology approach based on internal standards.

### Suggested Front-End Requirements

1. Responsive web interface.
2. Chart library capable of radar/polar chart.
3. Client-side scoring logic.
4. PDF export capability.
5. Browser compatibility.

### Suggested Back-End Requirements

Back-end may not be required for Phase 1 if:

1. No results are stored.
2. No login is needed.
3. No admin panel is needed.

If back-end is required, it should support:

1. Secure data storage.
2. Authentication.
3. Admin content management.
4. Audit logs.
5. API for submitting and retrieving results.

---

## 22. Audit and Logging

If data is stored, the system should maintain audit logs.

### Events to Log

1. Assessment started.
2. Assessment completed.
3. PDF downloaded.
4. Admin content updated.
5. Error events.

If no server-side storage is used, only technical logs should be maintained without storing individual answers.

---

## 23. Compliance and Governance

The solution should comply with:

1. Internal IT security policies.
2. Internal privacy and data governance policies.
3. Brand and digital guidelines.
4. Accessibility standards.
5. Any applicable HR data handling requirements.

---

## 24. Assumptions

1. The assessment content provided in this document is approved by the business owner.
2. Each question has equal weight.
3. Each section has equal weight.
4. The tool is intended for self-reflection and development, not formal performance evaluation.
5. Individual results should remain private unless a separate governance model is approved.
6. Phase 1 does not require integration with HR systems.
7. The wheel chart can be implemented using a standard radar or polar chart component.

---

## 25. Dependencies

| Dependency | Owner |
|---|---|
| Approval of assessment content | Business Owner |
| Approval of branding and UI | Brand / Digital Team |
| Hosting environment | IT |
| Security review | Cybersecurity / IT Security |
| Privacy review | Data Privacy / Compliance |
| User acceptance testing | Business Owner |
| PDF design approval | Business Owner / Digital Team |

---

## 26. Risks and Mitigations

| Risk | Impact | Mitigation |
|---|---|---|
| Users may think results affect performance evaluation | Low trust and low participation | Add clear disclaimer that the tool is for self-reflection and development |
| Privacy concerns | Users may avoid honest answers | Avoid storing identifiable results in Phase 1 |
| Wheel visual may be unclear on mobile | Poor user experience | Ensure responsive chart design |
| Questions may need future updates | Maintenance difficulty | Store questions in configurable format |
| PDF output may not match page design | Poor professional quality | Test PDF export across browsers |
| Score interpretation may be misunderstood | Misuse of results | Add clear explanation and reflection prompts |

---

## 27. Disclaimer

The following disclaimer should appear before the assessment and in the results report:

```text
The Wheel of Career Assessment is a self-reflection and development tool. It is not a formal performance evaluation and should not be used as the sole basis for promotion, compensation, or employment decisions.
```

---

## 28. Acceptance Testing Scenarios

| Test ID | Scenario | Expected Result |
|---|---|---|
| UAT-01 | User opens the landing page | Page loads successfully |
| UAT-02 | User starts assessment | First section or first question appears |
| UAT-03 | User answers all questions | User can submit successfully |
| UAT-04 | User skips one question | System prevents submission |
| UAT-05 | User completes assessment | Results page appears |
| UAT-06 | User receives scores | Scores are accurate based on answer selections |
| UAT-07 | User views wheel | Wheel reflects the calculated scores |
| UAT-08 | User downloads PDF | PDF downloads successfully |
| UAT-09 | User retakes assessment | Previous answers are cleared |
| UAT-10 | User opens page on mobile | Page is responsive and usable |
| UAT-11 | User opens page on Safari | Page works correctly |
| UAT-12 | User opens page on Edge | Page works correctly |

---

## 29. Sample Calculation for Testing

### Sample Answers for Role Clarity

| Question | Selected Answer | Score |
|---|---|---:|
| Q1 | D | 4 |
| Q2 | E | 5 |
| Q3 | C | 3 |
| Q4 | D | 4 |
| Q5 | C | 3 |

### Raw Score

```text
4 + 5 + 3 + 4 + 3 = 19
```

### Wheel Score

```text
19 ÷ 25 × 10 = 7.6
```

### Interpretation

```text
Good, but can be improved
```

---

## 30. Implementation Recommendation

The recommended Phase 1 implementation is:

1. Internal web page accessible to employees.
2. No server-side storage of individual responses.
3. Assessment questions loaded from a configurable content file.
4. Client-side scoring.
5. Radar chart or polar chart for the wheel output.
6. PDF download capability.
7. Responsive UI.
8. Clear privacy notice and disclaimer.

This approach reduces privacy complexity, shortens implementation time, and allows the business to test the concept before investing in advanced features such as dashboards, user history, HR integration, or AI-based coaching recommendations.

---

## 31. Approval

| Role | Name | Approval Status | Date |
|---|---|---|---|
| Business Owner |  | Pending |  |
| IT Owner |  | Pending |  |
| Data Privacy |  | Pending |  |
| IT Security |  | Pending |  |
| Brand / Digital |  | Pending |  |
