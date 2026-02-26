const Tasks = Array.from({ length: 100 }, (_, i) => ({
    id: i + 1,
    title: `Task ${i + 1}`,
    description: `Description for Task ${i + 1}`,
    status: i < 50 ? 'Pending' : 'Completed'
}));

export default Tasks;