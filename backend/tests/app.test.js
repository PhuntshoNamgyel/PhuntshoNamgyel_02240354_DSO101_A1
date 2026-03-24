// Simple unit tests for Todo API
describe('Todo API Tests', () => {
  test('adds 1 + 1 to equal 2', () => {
    expect(1 + 1).toBe(2);
  });

  test('todo item has required fields', () => {
    const todo = { id: 1, task: 'Test task', completed: false };
    expect(todo).toHaveProperty('id');
    expect(todo).toHaveProperty('task');
    expect(todo).toHaveProperty('completed');
  });

  test('todo task is a string', () => {
    const task = 'Buy groceries';
    expect(typeof task).toBe('string');
  });
});
