# Contribution Guidelines
Try to adhere to the following guidelines as much as possible.

### Git Practices
#### Commits should:
 - Be only as large as necessary to add a change without breaking other functionality.
 - Have a commit message that completes the sentence "If merged, this commit will..."
 - Avoid having the word "and" in its message. This is a sign that your commit is too big.
 - If commits that break functionality are necessary, consider creating a `feature/...` branch.
 - Keep `master` stable at all times
 
### Clean Code Practices
#### Your code should:
- Be designed with legibility, reusability and expandability in mind.
- Have descriptive variable, parameter and function names.
   
  For example,`var newLatitudeCoordinate` is better than `var x` even though it is longer.
- Make use of small, self-describing, reusable functions that are understandable at a glance.
 
If you can't describe what your function does without using the word "and", it's probably doing too much.
 
#### Your comments should:
- Be as few as necessary.
- Describe *why* or *how* you do something if it's not apparent from your code.
- Not have to describe *what* your code does. It is better to use more descriptive function, variable and parameter names instead.
 
### Documentation Practices
Currently, we only have a README file.
 
You should be familiar with the documentation and keep it in mind when you change functionality.
Any functionality changes that would affect the documentation's accuracu should be commited along with the appropriate documentation changes.
 
This is less important when working in a feature branch, but when merging a feature branch into development or master, please read through the relevant documentation beforehand and verify that it is still accurate.
 
### Issue Board Practices
Please make use of the issue board.

Please use the appropriate template when creating an issue, **especially for bugs reports!**

Remember to assign issues to yourself as you start work on them to avoid stepping on each others' feet.

Please add issues (even small changes) to the issue board immediately when you think of them.
That way they're don't slip your mind when you are working on something else.

## Thank you for your contributions!
