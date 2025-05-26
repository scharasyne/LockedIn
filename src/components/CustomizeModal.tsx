import React, { useState } from 'react';

const CustomizeModal: React.FC<{ isOpen: boolean; onClose: () => void }> = ({ isOpen, onClose }) => {
    const [musicOption, setMusicOption] = useState('');
    const [isPauseDisabled, setIsPauseDisabled] = useState(false);
    const [todoList, setTodoList] = useState<string[]>([]);
    const [todoInput, setTodoInput] = useState('');

    const handleAddTodo = () => {
        if (todoInput) {
            setTodoList([...todoList, todoInput]);
            setTodoInput('');
        }
    };

    return (
        <div className={`fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 ${isOpen ? 'block' : 'hidden'}`}>
            <div className="bg-white rounded-lg p-6 w-96">
                <h2 className="text-xl font-bold mb-4">Customize Your Experience</h2>
                <div className="mb-4">
                    <label className="block mb-2">Select Music:</label>
                    <select
                        value={musicOption}
                        onChange={(e) => setMusicOption(e.target.value)}
                        className="border rounded p-2 w-full"
                    >
                        <option value="">None</option>
                        <option value="lofi">Lofi</option>
                        <option value="classical">Classical</option>
                        <option value="jazz">Jazz</option>
                    </select>
                </div>
                <div className="mb-4">
                    <label className="flex items-center">
                        <input
                            type="checkbox"
                            checked={isPauseDisabled}
                            onChange={() => setIsPauseDisabled(!isPauseDisabled)}
                            className="mr-2"
                        />
                        Disable Pause Button
                    </label>
                </div>
                <div className="mb-4">
                    <label className="block mb-2">To-Do List:</label>
                    <input
                        type="text"
                        value={todoInput}
                        onChange={(e) => setTodoInput(e.target.value)}
                        className="border rounded p-2 w-full mb-2"
                        placeholder="Add a new task"
                    />
                    <button onClick={handleAddTodo} className="bg-blue-500 text-white rounded p-2">
                        Add
                    </button>
                    <ul className="mt-2">
                        {todoList.map((todo, index) => (
                            <li key={index} className="border-b py-1">{todo}</li>
                        ))}
                    </ul>
                </div>
                <div className="flex justify-end">
                    <button onClick={onClose} className="bg-gray-300 rounded p-2">
                        Close
                    </button>
                </div>
            </div>
        </div>
    );
};

export default CustomizeModal;