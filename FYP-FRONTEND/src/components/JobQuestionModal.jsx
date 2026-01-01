import React, { useState } from 'react';
import { X, Plus, Trash2, ArrowRight, Save } from 'lucide-react';
import Swal from 'sweetalert2';
import InputField from './InputField'; // Adjust path if needed

const JobQuestionModal = ({ job, onClose, onSave }) => {
  const [questionsQueue, setQuestionsQueue] = useState([]);
  
  // --- Current Question State ---
  const [currentQText, setCurrentQText] = useState("");
  const [currentQType, setCurrentQType] = useState("Technical");
  
  // --- Answers State ---
  const [currentAnswers, setCurrentAnswers] = useState([]); 
  const [tempAnswerText, setTempAnswerText] = useState("");
  const [tempAnswerScore, setTempAnswerScore] = useState("");

  const handleAddAnswer = () => {
    // FORCE RULE: Cannot add answer if Question Text is empty
    if (!currentQText.trim()) {
      Swal.fire({
        icon: 'warning',
        title: 'Step Missing',
        text: 'Please enter the Question Text first before adding answers.',
        confirmButtonColor: '#3b82f6'
      });
      return;
    }

    if (!tempAnswerText.trim()) return;
    
    const newAnswer = {
      answerText: tempAnswerText,
      scoreWeight: parseInt(tempAnswerScore) || 0
    };

    setCurrentAnswers([...currentAnswers, newAnswer]);
    setTempAnswerText("");
    setTempAnswerScore("");
  };

  const handleRemoveAnswer = (index) => {
    const newAnswers = [...currentAnswers];
    newAnswers.splice(index, 1);
    setCurrentAnswers(newAnswers);
  };

  const handleNext = () => {
    // 1. Validate Question Text
    if (!currentQText.trim()) {
      Swal.fire('Error', 'Please enter a question text', 'error');
      return;
    }
    
    // 2. Validate Answers (Must have at least one answer)
    if (currentAnswers.length === 0) {
      Swal.fire('Warning', 'Please add at least one answer option', 'warning');
      return;
    }

    // --- JSON STRUCTURE ---
    const newQuestionObj = {
      questionId: 0,
      questionText: currentQText,
      questionType: currentQType,
      predefinedAnswers: currentAnswers
    };

    setQuestionsQueue([...questionsQueue, newQuestionObj]);
    
    // Reset for next question (Forces user to start over)
    setCurrentQText("");
    setCurrentQType("Technical");
    setCurrentAnswers([]);
    setTempAnswerText("");
    setTempAnswerScore("");
    
    const Toast = Swal.mixin({ toast: true, position: 'top-end', showConfirmButton: false, timer: 1500 });
    Toast.fire({ icon: 'success', title: 'Question added to queue' });
  };

  const handleFinalSave = () => {
    if (currentQText.trim() && questionsQueue.length === 0) {
       Swal.fire('Notice', 'Please click "Next Question" to confirm this question before saving.', 'info');
       return; 
    }
    if (questionsQueue.length === 0) {
      Swal.fire('Error', 'No questions to save', 'error');
      return;
    }
    onSave(questionsQueue);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-in fade-in duration-200">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-2xl flex flex-col max-h-[90vh] overflow-hidden">
        
        {/* Header */}
        <div className="bg-gray-50 px-6 py-4 border-b border-gray-200 flex justify-between items-center">
          <div>
            <h2 className="text-lg font-bold text-gray-800">Add Screening Questions</h2>
            <p className="text-xs text-gray-500 uppercase tracking-wide mt-1">Job: {job?.jobTitle}</p>
          </div>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
            <X size={24} />
          </button>
        </div>

        {/* Body */}
        <div className="p-6 overflow-y-auto flex-1">
          
          {/* 1. Question Text */}
          <div className="mb-4">
             <InputField 
                label="Question Text"
                name="questionText"
                value={currentQText}
                onChange={(e) => setCurrentQText(e.target.value)}
                placeholder="e.g., How many years of React experience do you have?"
                required={true}
              />
          </div>

          {/* 2. Type (Score removed from here) */}
          <div className="mb-6">
            <label className="block text-gray-700 font-medium mb-2">Question Category</label>
            <div className="relative">
              <select 
                value={currentQType}
                onChange={(e) => setCurrentQType(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white appearance-none"
              >
                <option value="Technical">Technical</option>
                <option value="Behavioral">Behavioral</option>
                <option value="Experience">Experience</option>
                <option value="General">General Knowledge</option>
                <option value="SoftSkills">Soft Skills</option>
              </select>
              <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-gray-500">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
              </div>
            </div>
          </div>

          {/* 3. Answer Section */}
          <div className="mb-6 bg-blue-50 p-5 rounded-xl border border-blue-100 relative">
            
            {/* Overlay to block input if Question Text is empty */}
            {!currentQText.trim() && (
               <div className="absolute inset-0 bg-white/60 z-10 flex items-center justify-center rounded-xl backdrop-blur-[1px] border-2 border-dashed border-gray-300">
                  <span className="text-gray-500 font-medium bg-white px-3 py-1 rounded shadow-sm">Enter Question Text First</span>
               </div>
            )}

            <label className="block text-sm font-semibold text-blue-800 mb-3">
              Define Answers & Points
            </label>
            
            {/* Inputs for Answer & Score */}
            <div className="flex gap-3 items-start">
              <div className="flex-1">
                <InputField 
                  name="answerText"
                  value={tempAnswerText}
                  onChange={(e) => setTempAnswerText(e.target.value)}
                  placeholder="Possible Answer"
                  disabled={!currentQText.trim()}
                />
              </div>
              {/* Increased width from w-28 to w-36 to fix cutoff text */}
              <div className="w-36"> 
                <InputField 
                  name="answerScore"
                  type="number"
                  value={tempAnswerScore}
                  onChange={(e) => setTempAnswerScore(e.target.value)}
                  placeholder="Points" 
                  disabled={!currentQText.trim()}
                />
              </div>
              <button 
                onClick={handleAddAnswer}
                disabled={!currentQText.trim()}
                className={`mt-1 h-[48px] px-5 rounded-lg font-medium transition-colors flex items-center gap-1 ${
                  !currentQText.trim() 
                  ? 'bg-gray-300 text-gray-500 cursor-not-allowed' 
                  : 'bg-blue-600 hover:bg-blue-700 text-white'
                }`}
              >
                <Plus size={20} /> Add
              </button>
            </div>

            {/* List of Answers */}
            <div className="space-y-2 mt-2">
              {currentAnswers.map((ans, idx) => (
                <div key={idx} className="flex justify-between items-center bg-white px-4 py-3 rounded-lg border border-blue-100 shadow-sm">
                  <div className="flex items-center gap-3">
                    <span className="bg-blue-100 text-blue-700 text-xs font-bold px-2 py-1 rounded">{idx + 1}</span>
                    <span className="text-gray-700 font-medium">{ans.answerText}</span>
                    <span className="text-xs text-gray-400 bg-gray-100 px-2 py-0.5 rounded">Points: {ans.scoreWeight}</span>
                  </div>
                  <button onClick={() => handleRemoveAnswer(idx)} className="text-red-400 hover:text-red-600 p-1">
                    <X size={18} />
                  </button>
                </div>
              ))}
              {currentAnswers.length === 0 && (
                <p className="text-sm text-blue-400 italic text-center py-2">No answers added yet.</p>
              )}
            </div>
          </div>

          {/* Queue Preview */}
          {questionsQueue.length > 0 && (
            <div className="border-t border-gray-100 pt-4">
              <h3 className="text-xs font-bold text-gray-500 uppercase mb-3 tracking-wider">Ready to Save ({questionsQueue.length})</h3>
              <div className="space-y-2 max-h-32 overflow-y-auto pr-2">
                {questionsQueue.map((q, i) => (
                  <div key={i} className="text-sm text-gray-600 bg-gray-50 p-3 rounded-lg border border-gray-200 flex justify-between items-center">
                    <div className="truncate flex-1">
                      <span className="font-bold text-blue-600 mr-2">Q{i+1}</span> 
                      {q.questionText}
                    </div>
                    <div className="flex gap-2">
                      <span className="text-xs bg-white border border-gray-200 px-2 py-1 rounded text-gray-500 whitespace-nowrap">
                        {q.questionType}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-5 border-t border-gray-200 bg-gray-50 flex justify-between items-center">
          <button onClick={onClose} className="px-6 py-2.5 text-gray-600 font-medium hover:bg-gray-200 rounded-lg transition-colors">
            Cancel
          </button>
          <div className="flex gap-3">
            <button onClick={handleNext} className="px-6 py-2.5 bg-white border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50 flex items-center gap-2 shadow-sm">
              Next Question <ArrowRight size={18} />
            </button>
            <button onClick={handleFinalSave} className="px-6 py-2.5 bg-green-600 text-white font-medium rounded-lg hover:bg-green-700 flex items-center gap-2 shadow-md">
              <Save size={18} /> Save All
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobQuestionModal;
