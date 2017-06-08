// we did not put in the reducers file because it serves a different purpose
// also if we use reselect to memoize functions they recommend this approach
export function authorsFormattedForDropdown(authors) {
  return authors.map(author => {
    return {
      value: author.id,
      text: author.firstName + ' ' + author.lastName
    };
  });
}
