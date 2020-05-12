let emp = [
    { name : 'Jiyun Noh', age : 26, company : 'Disney', position : 'Web Developer'},
    { name : 'Michael Kim', age : 27, company : 'Apple', position : 'Software Engineer'},
    { name : 'Sky Kang', age : 30, company : 'Amazon', position : 'Marketing Manager'},
    { name : 'Brad Pitt', age : 53, company : 'Brothers', position : 'Vice President of Sales'},
    { name : 'Emma Watson', age : 35, company : 'Hogwarts', position : 'Head Nurse'}
];

// exports.emp = emp;
exports.getAll = () => emp;
exports.get = (name) => {
    return emp.find((item) => {
        return item.name === name;
    });
};

exports.add = (newItem) => {
    const oldLength = emp.length;
    let found = this.get(newItem.name);
    if (!found) {
        emp.push(newItem);
    }
    return {added: oldLength !== emp.length}
};

exports.delete = (name) => {
    const oldLength = emp.length;
    emp = emp.filter((item) => {
        return item.name !== name;
    });
    return {deleted: oldLength !== emp.length}
};