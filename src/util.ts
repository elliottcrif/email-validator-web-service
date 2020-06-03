export const uniqueEmails = (emails: string[]): number => {
  return emails.reduce((set, currentEmail) => {
    let [name, domain] = currentEmail.split("@");
    name = name.replace(/\+.*/g, "").replace(".", "");
    set.add(`${name}@${domain}`);
    return set;
  }, new Set()).size;
};
