Framework:
- Make this app to work as a git hub pages application fully functional for all features currently there.
- TO have this app working in github pages without any backend, feel free to go for any javascript frameworks like node.js or any other. 
- GIven python cannot be used to run in github pages being self sufficient, use any javascript framework that can run in github pages which is easily maintainable.

UI:
- Make it a solid professional site which is equally good on mobile and desktop, use the themes so it looks modern and professional.
- Left Menu with items to navigate
- Top header section which freezes even if we scroll vertically
- Main section to have core stock data

Functional:
- refer to the file @doc/functionality.md for detailed functionality specification

Non functional:
- Ensure the app is fully functional and all features work as expected.
- COnsistency - ensure the flow works accuratelt per market data. Example: refreshing the page during off market hrs should not change dara randomly.
- Ensure the app is responsive and works on all devices.
- Ensure the app is accessible and works on all browsers.
- Ensure the app is easily maintainable and scalable.
- Ensure app is modular and easy to understand.
- Ensure app is easy to test.
- Use configs (specifially user preferences like etfs, portfolio, watchlist and us stock lists) in json format (not text files).
- Add unit tests for critical components to ensure reliability and prevent regressions while making changes.

Structure for spec:
- Spec specific info should be in /doc folder.

Documentation:
- Ensure no extra readmes are created, all relevant setup docs or info should go into existing README.md (including test instructions, unit test setup, etc.).

Deployment:
- Also help with deployment to github pages with github actions.

Clean up:
- Help me with cleaning up all unsed files after all the changes, remove unused files.

Running app locally:
-Also have guidance to run the application locally for testing in Readme.