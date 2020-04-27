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
