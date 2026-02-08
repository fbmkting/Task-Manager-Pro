import React, { useState, useEffect } from 'react';
import { Plus, Check, Eye, EyeOff, Trash2, Settings, Palette, ChevronDown, ChevronUp, Calendar, AlertCircle, Edit2, X, ArrowUp, ArrowDown, ArrowLeft, ArrowRight } from 'lucide-react';

function App() {
  // TAB INIZIALI - Questi sono i 7 tab di default
  const DEFAULT_TABS = [
    { id: 'personale', name: 'Personale', color: '#3B82F6' },
    { id: 'famiglia', name: 'Famiglia', color: '#EC4899' },
    { id: 'confsalfisals', name: 'ConfsalFisals', color: '#8B5CF6' },
    { id: 'executiveservices', name: 'ExecutiveServices', color: '#10B981' },
    { id: 'braviservices', name: 'BraviServices', color: '#F59E0B' },
    { id: 'mcnew', name: 'MCNew', color: '#EF4444' },
    { id: 'libretti', name: 'Libretti', color: '#06B6D4' },
  ];

  const [tabs, setTabs] = useState(DEFAULT_TABS);
  const [activeTab, setActiveTab] = useState('personale');
  const [tasks, setTasks] = useState({});
  const [newTaskText, setNewTaskText] = useState('');
  const [showArchived, setShowArchived] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [expandedTasks, setExpandedTasks] = useState({});
  const [editingTaskId, setEditingTaskId] = useState(null);
  const [editingTaskText, setEditingTaskText] = useState('');
  const [newTabName, setNewTabName] = useState('');
  const [showNewTabInput, setShowNewTabInput] = useState(false);
  const [editingTabId, setEditingTabId] = useState(null);
  const [editingTabName, setEditingTabName] = useState('');

  const tags = [
    { id: 'urgente', label: 'URGENTE', color: '#EF4444' },
    { id: 'importante', label: 'IMPORTANTE', color: '#F59E0B' },
    { id: 'bug', label: 'BUG', color: '#DC2626' },
    { id: 'idea', label: 'IDEA', color: '#10B981' },
  ];

  const priorities = [
    { id: 'alta', label: 'Alta', color: '#DC2626' },
    { id: 'media', label: 'Media', color: '#F59E0B' },
    { id: 'bassa', label: 'Bassa', color: '#10B981' },
  ];

  // Carica i dati dal localStorage al mount
  useEffect(() => {
    try {
      const savedTabs = localStorage.getItem('taskmanager-tabs');
      const savedTasks = localStorage.getItem('taskmanager-tasks');
      
      if (savedTabs) {
        setTabs(JSON.parse(savedTabs));
      }
      if (savedTasks) {
        setTasks(JSON.parse(savedTasks));
      }
    } catch (error) {
      console.log('Primo avvio - dati inizializzati');
    }
  }, []);

  // Salva i dati nel localStorage ad ogni modifica
  useEffect(() => {
    localStorage.setItem('taskmanager-tabs', JSON.stringify(tabs));
    localStorage.setItem('taskmanager-tasks', JSON.stringify(tasks));
  }, [tabs, tasks]);

  const addTask = () => {
    if (!newTaskText.trim()) return;
    
    const newTask = {
      id: Date.now(),
      text: newTaskText,
      completed: false,
      archived: false,
      tags: [],
      priority: null,
      dueDate: null,
      subtasks: [],
      createdAt: new Date().toISOString(),
    };

    setTasks(prev => ({
      ...prev,
      [activeTab]: [...(prev[activeTab] || []), newTask]
    }));
    setNewTaskText('');
  };

  const toggleTask = (taskId) => {
    setTasks(prev => ({
      ...prev,
      [activeTab]: prev[activeTab].map(task => {
        if (task.id === taskId) {
          const allSubtasksCompleted = task.subtasks.length === 0 || task.subtasks.every(st => st.completed);
          const shouldArchive = !task.completed && allSubtasksCompleted;
          return { 
            ...task, 
            completed: !task.completed, 
            archived: shouldArchive 
          };
        }
        return task;
      })
    }));
  };

  const toggleTag = (taskId, tagId) => {
    setTasks(prev => ({
      ...prev,
      [activeTab]: prev[activeTab].map(task => {
        if (task.id === taskId) {
          const hasTags = task.tags.includes(tagId);
          return {
            ...task,
            tags: hasTags ? task.tags.filter(t => t !== tagId) : [...task.tags, tagId]
          };
        }
        return task;
      })
    }));
  };

  const setPriority = (taskId, priorityId) => {
    setTasks(prev => ({
      ...prev,
      [activeTab]: prev[activeTab].map(task =>
        task.id === taskId ? { ...task, priority: task.priority === priorityId ? null : priorityId } : task
      )
    }));
  };

  const setDueDate = (taskId, date) => {
    setTasks(prev => ({
      ...prev,
      [activeTab]: prev[activeTab].map(task =>
        task.id === taskId ? { ...task, dueDate: date } : task
      )
    }));
  };

  const addSubtask = (taskId, subtaskText) => {
    if (!subtaskText.trim()) return;
    
    setTasks(prev => ({
      ...prev,
      [activeTab]: prev[activeTab].map(task => {
        if (task.id === taskId) {
          return {
            ...task,
            subtasks: [...task.subtasks, { id: Date.now(), text: subtaskText, completed: false }]
          };
        }
        return task;
      })
    }));
  };

  const toggleSubtask = (taskId, subtaskId) => {
    setTasks(prev => ({
      ...prev,
      [activeTab]: prev[activeTab].map(task => {
        if (task.id === taskId) {
          const updatedSubtasks = task.subtasks.map(st =>
            st.id === subtaskId ? { ...st, completed: !st.completed } : st
          );
          return { ...task, subtasks: updatedSubtasks };
        }
        return task;
      })
    }));
  };

  const deleteSubtask = (taskId, subtaskId) => {
    setTasks(prev => ({
      ...prev,
      [activeTab]: prev[activeTab].map(task =>
        task.id === taskId ? { ...task, subtasks: task.subtasks.filter(st => st.id !== subtaskId) } : task
      )
    }));
  };

  const deleteTask = (taskId) => {
    setTasks(prev => ({
      ...prev,
      [activeTab]: prev[activeTab].filter(task => task.id !== taskId)
    }));
  };

  const updateTabColor = (tabId, color) => {
    setTabs(prev => prev.map(tab => 
      tab.id === tabId ? { ...tab, color } : tab
    ));
  };

  const toggleExpanded = (taskId) => {
    setExpandedTasks(prev => ({
      ...prev,
      [taskId]: !prev[taskId]
    }));
  };

  // NUOVE FUNZIONI PER MODIFICARE TASK
  const startEditingTask = (taskId, currentText) => {
    setEditingTaskId(taskId);
    setEditingTaskText(currentText);
  };

  const cancelEditingTask = () => {
    setEditingTaskId(null);
    setEditingTaskText('');
  };

  const saveTaskEdit = (taskId) => {
    if (!editingTaskText.trim()) {
      cancelEditingTask();
      return;
    }

    setTasks(prev => ({
      ...prev,
      [activeTab]: prev[activeTab].map(task =>
        task.id === taskId ? { ...task, text: editingTaskText.trim() } : task
      )
    }));
    
    setEditingTaskId(null);
    setEditingTaskText('');
  };

  // NUOVE FUNZIONI PER GESTIRE TAB
  const addNewTab = () => {
    if (!newTabName.trim()) return;

    const newTab = {
      id: `tab-${Date.now()}`,
      name: newTabName.trim(),
      color: '#6366F1'
    };

    setTabs(prev => [...prev, newTab]);
    setNewTabName('');
    setShowNewTabInput(false);
    setActiveTab(newTab.id);
  };

  const startEditingTab = (tabId, currentName) => {
    setEditingTabId(tabId);
    setEditingTabName(currentName);
  };

  const cancelEditingTab = () => {
    setEditingTabId(null);
    setEditingTabName('');
  };

  const saveTabEdit = (tabId) => {
    if (!editingTabName.trim()) {
      cancelEditingTab();
      return;
    }

    setTabs(prev => prev.map(tab =>
      tab.id === tabId ? { ...tab, name: editingTabName.trim() } : tab
    ));

    setEditingTabId(null);
    setEditingTabName('');
  };

  const deleteTab = (tabId) => {
    if (tabs.length <= 1) {
      alert('Non puoi eliminare l\'ultimo tab!');
      return;
    }

    if (!window.confirm('Sei sicuro di voler eliminare questo tab? Tutti i task al suo interno verranno eliminati.')) {
      return;
    }

    // Rimuovi il tab
    setTabs(prev => prev.filter(tab => tab.id !== tabId));

    // Rimuovi i task del tab
    setTasks(prev => {
      const newTasks = { ...prev };
      delete newTasks[tabId];
      return newTasks;
    });

    // Se il tab eliminato era attivo, passa al primo disponibile
    if (activeTab === tabId) {
      const remainingTabs = tabs.filter(tab => tab.id !== tabId);
      if (remainingTabs.length > 0) {
        setActiveTab(remainingTabs[0].id);
      }
    }
  };

  // NUOVE FUNZIONI PER SPOSTARE TAB
  const moveTabLeft = (index) => {
    if (index === 0) return; // Gia il primo
    
    setTabs(prev => {
      const newTabs = [...prev];
      [newTabs[index - 1], newTabs[index]] = [newTabs[index], newTabs[index - 1]];
      return newTabs;
    });
  };

  const moveTabRight = (index) => {
    if (index === tabs.length - 1) return; // Gia l'ultimo
    
    setTabs(prev => {
      const newTabs = [...prev];
      [newTabs[index], newTabs[index + 1]] = [newTabs[index + 1], newTabs[index]];
      return newTabs;
    });
  };

  // NUOVE FUNZIONI PER SPOSTARE TASK
  const moveTaskUp = (taskId) => {
    setTasks(prev => {
      const tabTasks = prev[activeTab] || [];
      const index = tabTasks.findIndex(t => t.id === taskId);
      
      if (index <= 0) return prev; // Gia il primo o non trovato
      
      const newTabTasks = [...tabTasks];
      [newTabTasks[index - 1], newTabTasks[index]] = [newTabTasks[index], newTabTasks[index - 1]];
      
      return {
        ...prev,
        [activeTab]: newTabTasks
      };
    });
  };

  const moveTaskDown = (taskId) => {
    setTasks(prev => {
      const tabTasks = prev[activeTab] || [];
      const index = tabTasks.findIndex(t => t.id === taskId);
      
      if (index === -1 || index === tabTasks.length - 1) return prev; // Gia l'ultimo o non trovato
      
      const newTabTasks = [...tabTasks];
      [newTabTasks[index], newTabTasks[index + 1]] = [newTabTasks[index + 1], newTabTasks[index]];
      
      return {
        ...prev,
        [activeTab]: newTabTasks
      };
    });
  };

  const getUrgentCount = (tabId) => {
    const tabTasks = tasks[tabId] || [];
    return tabTasks.filter(task => !task.archived && task.tags.includes('urgente')).length;
  };

  const getDueDateStatus = (dueDate) => {
    if (!dueDate) return null;
    
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const due = new Date(dueDate);
    due.setHours(0, 0, 0, 0);
    
    const diffTime = due - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays < 0) return { status: 'overdue', label: 'Scaduto', color: 'text-red-600 bg-red-50' };
    if (diffDays === 0) return { status: 'today', label: 'Oggi', color: 'text-orange-600 bg-orange-50' };
    if (diffDays <= 3) return { status: 'soon', label: `${diffDays}g`, color: 'text-yellow-600 bg-yellow-50' };
    return { status: 'future', label: `${diffDays}g`, color: 'text-gray-600 bg-gray-50' };
  };

  const currentTasks = (tasks[activeTab] || []).filter(task => 
    showArchived ? task.archived : !task.archived
  );

  const activeColor = tabs.find(t => t.id === activeTab)?.color || '#3B82F6';

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-2xl font-bold text-gray-800">Task Manager Pro</h1>
            <button
              onClick={() => setShowSettings(!showSettings)}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <Settings size={20} className="text-gray-600" />
            </button>
          </div>

          {/* Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 pt-2">
            {tabs.map(tab => {
              const urgentCount = getUrgentCount(tab.id);
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`relative px-4 py-2 rounded-lg font-medium transition-all whitespace-nowrap text-sm ${
                    activeTab === tab.id
                      ? 'text-white shadow-md'
                      : 'text-gray-600 bg-white hover:bg-gray-50'
                  }`}
                  style={{
                    backgroundColor: activeTab === tab.id ? tab.color : undefined,
                    marginTop: urgentCount > 0 ? '8px' : '0',
                  }}
                >
                  {tab.name}
                  {urgentCount > 0 && (
                    <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold rounded-full min-w-[24px] h-6 flex items-center justify-center px-1.5 border-2 border-white shadow-md z-10">
                      {urgentCount}
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Settings Panel */}
      {showSettings && (
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="bg-white rounded-lg shadow-sm p-4 border border-gray-200 space-y-6">
            {/* Sezione Gestione Tab */}
            <div>
              <h3 className="font-semibold text-gray-800 mb-3 flex items-center gap-2">
                Gestione Tab
              </h3>
              
              <div className="space-y-3">
                {tabs.map((tab, index) => (
                  <div key={tab.id} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                    {/* Frecce per spostare */}
                    <div className="flex flex-col gap-1">
                      <button
                        onClick={() => moveTabLeft(index)}
                        disabled={index === 0}
                        className={`p-1 rounded transition-colors ${
                          index === 0 
                            ? 'text-gray-300 cursor-not-allowed' 
                            : 'text-gray-600 hover:bg-gray-200'
                        }`}
                        title="Sposta a sinistra"
                      >
                        <ArrowLeft size={16} />
                      </button>
                      <button
                        onClick={() => moveTabRight(index)}
                        disabled={index === tabs.length - 1}
                        className={`p-1 rounded transition-colors ${
                          index === tabs.length - 1 
                            ? 'text-gray-300 cursor-not-allowed' 
                            : 'text-gray-600 hover:bg-gray-200'
                        }`}
                        title="Sposta a destra"
                      >
                        <ArrowRight size={16} />
                      </button>
                    </div>

                    {editingTabId === tab.id ? (
                      // Modalita Modifica Tab
                      <>
                        <input
                          type="text"
                          value={editingTabName}
                          onChange={(e) => setEditingTabName(e.target.value)}
                          onKeyPress={(e) => {
                            if (e.key === 'Enter') saveTabEdit(tab.id);
                            if (e.key === 'Escape') cancelEditingTab();
                          }}
                          autoFocus
                          className="flex-1 px-3 py-2 border border-blue-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        <button
                          onClick={() => saveTabEdit(tab.id)}
                          className="p-2 text-green-600 hover:bg-green-100 rounded transition-colors"
                          title="Salva"
                        >
                          <Check size={18} />
                        </button>
                        <button
                          onClick={cancelEditingTab}
                          className="p-2 text-red-600 hover:bg-red-100 rounded transition-colors"
                          title="Annulla"
                        >
                          <X size={18} />
                        </button>
                      </>
                    ) : (
                      // Modalita Visualizzazione Tab
                      <>
                        <span className="text-sm text-gray-700 font-medium flex-1">{tab.name}</span>
                        <input
                          type="color"
                          value={tab.color}
                          onChange={(e) => updateTabColor(tab.id, e.target.value)}
                          className="w-12 h-10 rounded cursor-pointer border-2 border-gray-200"
                          title="Cambia colore"
                        />
                        <button
                          onClick={() => startEditingTab(tab.id, tab.name)}
                          className="p-2 text-blue-500 hover:bg-blue-100 rounded transition-colors"
                          title="Rinomina tab"
                        >
                          <Edit2 size={16} />
                        </button>
                        <button
                          onClick={() => deleteTab(tab.id)}
                          className="p-2 text-red-500 hover:bg-red-100 rounded transition-colors"
                          title="Elimina tab"
                        >
                          <Trash2 size={16} />
                        </button>
                      </>
                    )}
                  </div>
                ))}

                {/* Input per nuovo tab */}
                {showNewTabInput ? (
                  <div className="flex items-center gap-2 p-3 bg-blue-50 rounded-lg border-2 border-blue-200">
                    <input
                      type="text"
                      value={newTabName}
                      onChange={(e) => setNewTabName(e.target.value)}
                      onKeyPress={(e) => {
                        if (e.key === 'Enter') addNewTab();
                        if (e.key === 'Escape') {
                          setShowNewTabInput(false);
                          setNewTabName('');
                        }
                      }}
                      placeholder="Nome del nuovo tab..."
                      autoFocus
                      className="flex-1 px-3 py-2 border border-blue-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <button
                      onClick={addNewTab}
                      className="p-2 bg-blue-500 text-white hover:bg-blue-600 rounded transition-colors"
                      title="Aggiungi"
                    >
                      <Check size={18} />
                    </button>
                    <button
                      onClick={() => {
                        setShowNewTabInput(false);
                        setNewTabName('');
                      }}
                      className="p-2 bg-gray-300 text-gray-700 hover:bg-gray-400 rounded transition-colors"
                      title="Annulla"
                    >
                      <X size={18} />
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={() => setShowNewTabInput(true)}
                    className="w-full p-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors flex items-center justify-center gap-2 font-medium"
                  >
                    <Plus size={20} />
                    Aggiungi Nuovo Tab
                  </button>
                )}
              </div>
            </div>

            {/* Sezione Colori Tab (vecchia) - RIMOSSA, ora Ã¨ nella sezione sopra */}
          </div>
        </div>
      )}

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-6">
        {/* Controls */}
        <div className="bg-white rounded-lg shadow-sm p-4 mb-4 border border-gray-200">
          <div className="flex items-center gap-2 mb-3">
            <input
              type="text"
              value={newTaskText}
              onChange={(e) => setNewTaskText(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && addTask()}
              placeholder="Aggiungi un nuovo task..."
              className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-opacity-50"
            />
            <button
              onClick={addTask}
              className="px-6 py-2 text-white rounded-lg font-medium transition-all hover:opacity-90 shadow-sm"
              style={{ backgroundColor: activeColor }}
            >
              <Plus size={20} />
            </button>
          </div>

          <button
            onClick={() => setShowArchived(!showArchived)}
            className="flex items-center gap-2 text-sm text-gray-600 hover:text-gray-800 transition-colors"
          >
            {showArchived ? <EyeOff size={16} /> : <Eye size={16} />}
            {showArchived ? 'Nascondi archiviati' : 'Mostra archiviati'}
          </button>
        </div>

        {/* Tasks List */}
        <div className="space-y-2">
          {currentTasks.length === 0 ? (
            <div className="bg-white rounded-lg shadow-sm p-8 text-center border border-gray-200">
              <p className="text-gray-500">
                {showArchived ? 'Nessun task archiviato' : 'Nessun task attivo. Aggiungine uno!'}
              </p>
            </div>
          ) : (
            currentTasks.map((task, taskIndex) => {
              const isExpanded = expandedTasks[task.id];
              const dueDateStatus = getDueDateStatus(task.dueDate);
              const priorityInfo = priorities.find(p => p.id === task.priority);
              const completedSubtasks = task.subtasks.filter(st => st.completed).length;
              const totalSubtasks = task.subtasks.length;

              return (
                <div
                  key={task.id}
                  className={`rounded-lg shadow-sm border-2 transition-all ${
                    task.completed 
                      ? 'bg-gray-50 border-gray-200 opacity-75' 
                      : task.tags && task.tags.includes('urgente')
                        ? 'bg-red-100 border-red-300 hover:shadow-md'
                        : 'bg-green-100 border-green-300 hover:shadow-md'
                  }`}
                >
                  {/* Main Task */}
                  <div className="p-4">
                    <div className="flex items-start gap-3">
                      <button
                        onClick={() => toggleTask(task.id)}
                        className={`mt-1 flex-shrink-0 w-5 h-5 rounded border-2 flex items-center justify-center transition-all ${
                          task.completed
                            ? 'bg-green-500 border-green-500'
                            : 'border-gray-300 hover:border-gray-400'
                        }`}
                      >
                        {task.completed && <Check size={14} className="text-white" />}
                      </button>

                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-2">
                          {editingTaskId === task.id ? (
                            // Modalita Modifica
                            <div className="flex-1 flex items-center gap-2">
                              <input
                                type="text"
                                value={editingTaskText}
                                onChange={(e) => setEditingTaskText(e.target.value)}
                                onKeyPress={(e) => {
                                  if (e.key === 'Enter') saveTaskEdit(task.id);
                                  if (e.key === 'Escape') cancelEditingTask();
                                }}
                                autoFocus
                                className="flex-1 px-2 py-1 border border-blue-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                              />
                              <button
                                onClick={() => saveTaskEdit(task.id)}
                                className="p-1 text-green-600 hover:bg-green-50 rounded transition-colors"
                                title="Salva"
                              >
                                <Check size={18} />
                              </button>
                              <button
                                onClick={cancelEditingTask}
                                className="p-1 text-red-600 hover:bg-red-50 rounded transition-colors"
                                title="Annulla"
                              >
                                <X size={18} />
                              </button>
                            </div>
                          ) : (
                            // Modalita Visualizzazione
                            <>
                              <p className={`text-gray-800 flex-1 ${task.completed ? 'line-through text-gray-500' : ''}`}>
                                {task.text}
                              </p>
                              
                              <div className="flex items-center gap-2 flex-shrink-0">
                                {!task.completed && (
                                  <button
                                    onClick={() => startEditingTask(task.id, task.text)}
                                    className="p-1 text-blue-500 hover:bg-blue-50 rounded transition-colors"
                                    title="Modifica task"
                                  >
                                    <Edit2 size={16} />
                                  </button>
                                )}

                                {/* Frecce per spostare task */}
                                <div className="flex flex-col gap-0.5">
                                  <button
                                    onClick={() => moveTaskUp(task.id)}
                                    disabled={taskIndex === 0}
                                    className={`p-0.5 rounded transition-colors ${
                                      taskIndex === 0 
                                        ? 'text-gray-300 cursor-not-allowed' 
                                        : 'text-gray-600 hover:bg-gray-200'
                                    }`}
                                    title="Sposta su"
                                  >
                                    <ArrowUp size={14} />
                                  </button>
                                  <button
                                    onClick={() => moveTaskDown(task.id)}
                                    disabled={taskIndex === currentTasks.length - 1}
                                    className={`p-0.5 rounded transition-colors ${
                                      taskIndex === currentTasks.length - 1 
                                        ? 'text-gray-300 cursor-not-allowed' 
                                        : 'text-gray-600 hover:bg-gray-200'
                                    }`}
                                    title="Sposta giu"
                                  >
                                    <ArrowDown size={14} />
                                  </button>
                                </div>

                                {priorityInfo && (
                                  <span 
                                    className="w-3 h-3 rounded-sm" 
                                    style={{ backgroundColor: priorityInfo.color }}
                                    title={`Priorita ${priorityInfo.label}`}
                                  />
                                )}

                                {dueDateStatus && (
                                  <span className={`px-2 py-1 text-xs font-semibold rounded ${dueDateStatus.color} flex items-center gap-1`}>
                                    {dueDateStatus.status === 'overdue' && <AlertCircle size={12} />}
                                    {dueDateStatus.label}
                                  </span>
                                )}

                                {totalSubtasks > 0 && (
                                  <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">
                                    {completedSubtasks}/{totalSubtasks}
                                  </span>
                                )}

                                <button
                                  onClick={() => toggleExpanded(task.id)}
                                  className="p-1 hover:bg-gray-100 rounded transition-colors"
                                >
                                  {isExpanded ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                                </button>

                                <button
                                  onClick={() => deleteTask(task.id)}
                                  className="p-1 text-red-500 hover:bg-red-50 rounded transition-colors"
                                >
                                  <Trash2 size={18} />
                                </button>
                              </div>
                            </>
                          )}
                        </div>
                        
                        {/* Tags */}
                        <div className="flex flex-wrap gap-2 mt-2">
                          {tags.map(tag => (
                            <button
                              key={tag.id}
                              onClick={() => toggleTag(task.id, tag.id)}
                              className={`px-2 py-1 text-xs font-semibold rounded transition-all ${
                                task.tags.includes(tag.id)
                                  ? 'text-white shadow-sm'
                                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                              }`}
                              style={{
                                backgroundColor: task.tags.includes(tag.id) ? tag.color : undefined,
                              }}
                            >
                              {tag.label}
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Expanded Section */}
                  {isExpanded && (
                    <div className="px-4 pb-4 border-t border-gray-100 pt-4 space-y-4">
                      {/* Priority Selection */}
                      <div>
                        <label className="text-sm font-semibold text-gray-700 mb-2 block">Priorita</label>
                        <div className="flex gap-2 flex-wrap">
                          {priorities.map(priority => (
                            <button
                              key={priority.id}
                              onClick={() => setPriority(task.id, priority.id)}
                              className={`px-3 py-1.5 text-sm rounded transition-all flex items-center gap-2 ${
                                task.priority === priority.id
                                  ? 'text-white font-semibold shadow-sm'
                                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                              }`}
                              style={{
                                backgroundColor: task.priority === priority.id ? priority.color : undefined,
                              }}
                            >
                              <span 
                                className="w-2.5 h-2.5 rounded-full" 
                                style={{ 
                                  backgroundColor: task.priority === priority.id ? 'white' : priority.color 
                                }}
                              />
                              {priority.label}
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* Due Date */}
                      <div>
                        <label className="text-sm font-semibold text-gray-700 mb-2 block flex items-center gap-1">
                          <Calendar size={14} />
                          Data Scadenza
                        </label>
                        <input
                          type="date"
                          value={task.dueDate || ''}
                          onChange={(e) => setDueDate(task.id, e.target.value)}
                          className="px-3 py-1.5 border border-gray-300 rounded text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      </div>

                      {/* Subtasks */}
                      <div>
                        <label className="text-sm font-semibold text-gray-700 mb-2 block">Sottotask</label>
                        <div className="space-y-2">
                          {task.subtasks.map(subtask => (
                            <div key={subtask.id} className="flex items-center gap-2 bg-gray-50 p-2 rounded">
                              <button
                                onClick={() => toggleSubtask(task.id, subtask.id)}
                                className={`flex-shrink-0 w-4 h-4 rounded border-2 flex items-center justify-center transition-all ${
                                  subtask.completed
                                    ? 'bg-green-500 border-green-500'
                                    : 'border-gray-300 hover:border-gray-400'
                                }`}
                              >
                                {subtask.completed && <Check size={10} className="text-white" />}
                              </button>
                              <span className={`flex-1 text-sm ${subtask.completed ? 'line-through text-gray-500' : 'text-gray-700'}`}>
                                {subtask.text}
                              </span>
                              <button
                                onClick={() => deleteSubtask(task.id, subtask.id)}
                                className="p-1 text-red-500 hover:bg-red-100 rounded transition-colors"
                              >
                                <Trash2 size={14} />
                              </button>
                            </div>
                          ))}
                          
                          <div className="flex gap-2">
                            <input
                              type="text"
                              placeholder="Aggiungi sottotask..."
                              onKeyPress={(e) => {
                                if (e.key === 'Enter' && e.target.value.trim()) {
                                  addSubtask(task.id, e.target.value);
                                  e.target.value = '';
                                }
                              }}
                              className="flex-1 px-3 py-1.5 border border-gray-300 rounded text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
