'use client';

import { useState } from 'react';
import { Send, User, Bot, Search, MessageSquare } from 'lucide-react';
import { sendMessage } from '../../actions';
import { formatDistanceToNow } from 'date-fns';

export default function MessagesTab({ data }: { data: any[] }) {
  const [newMessage, setNewMessage] = useState('');
  const [isSending, setIsSending] = useState(false);

  async function handleSendMessage(formData: FormData) {
    setIsSending(true);
    try {
      await sendMessage(formData);
      setNewMessage('');
    } catch (error) {
      console.error(error);
    } finally {
      setIsSending(false);
    }
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-[calc(100vh-250px)] min-h-[600px] animate-in fade-in duration-500">
      {/* Message List */}
      <div className="lg:col-span-1 bg-white rounded-xl shadow-sm border border-slate-100 flex flex-col overflow-hidden">
        <div className="p-4 border-b border-slate-100">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
            <input 
              type="text" 
              placeholder="Search messages..." 
              className="w-full pl-10 pr-4 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#009FCE]/50"
            />
          </div>
        </div>
        <div className="flex-1 overflow-y-auto">
          {data && data.length > 0 ? (
            data.map((msg: any) => (
              <div key={msg.id} className={`p-4 border-b border-slate-50 cursor-pointer hover:bg-slate-50 transition-colors ${!msg.isRead && msg.direction === 'outbound' ? 'bg-[#F0FAFC]' : ''}`}>
                <div className="flex justify-between items-start mb-1">
                  <h4 className={`text-sm font-semibold ${!msg.isRead ? 'text-[#002B4A]' : 'text-slate-700'}`}>
                    {msg.subject || 'No Subject'}
                  </h4>
                  <span className="text-xs text-slate-400 whitespace-nowrap ml-2">
                    {msg.createdAt ? formatDistanceToNow(new Date(msg.createdAt), { addSuffix: true }) : ''}
                  </span>
                </div>
                <p className="text-sm text-slate-500 line-clamp-2">{msg.content}</p>
              </div>
            ))
          ) : (
            <div className="p-8 text-center text-slate-400">
              <p>No messages found.</p>
            </div>
          )}
        </div>
      </div>

      {/* Message Detail / Chat View */}
      <div className="lg:col-span-2 bg-white rounded-xl shadow-sm border border-slate-100 flex flex-col overflow-hidden">
        <div className="p-4 border-b border-slate-100 bg-slate-50/50 flex justify-between items-center">
          <div>
            <h3 className="font-bold text-[#002B4A]">Current Discussion</h3>
            <p className="text-xs text-slate-500">Usually replies within 2 hours</p>
          </div>
          <span className="bg-green-100 text-green-700 text-xs px-2 py-1 rounded-full font-medium">Active</span>
        </div>

        <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-50/30">
          {data && data.length > 0 ? (
            data.map((msg: any) => (
             <div key={msg.id} className={`flex gap-3 ${msg.direction === 'inbound' ? 'flex-row-reverse' : ''}`}>
               <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${msg.direction === 'inbound' ? 'bg-[#009FCE] text-white' : 'bg-slate-200 text-slate-600'}`}>
                 {msg.direction === 'inbound' ? <User size={16} /> : <Bot size={16} />}
               </div>
               <div className={`max-w-[75%] p-3 rounded-xl text-sm ${msg.direction === 'inbound' ? 'bg-[#009FCE] text-white rounded-tr-none' : 'bg-white border border-slate-200 text-slate-700 rounded-tl-none'}`}>
                 <p>{msg.content}</p>
                 <span className={`text-[10px] opacity-70 block mt-1 ${msg.direction === 'inbound' ? 'text-white' : 'text-slate-400'}`}>
                   {msg.createdAt && new Date(msg.createdAt).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                 </span>
               </div>
             </div>
            ))
          ) : (
            <div className="h-full flex flex-col items-center justify-center text-slate-400 opacity-50">
              <MessageSquare className="mb-2" size={48} />
              <p>Start a conversation with us!</p>
            </div>
          )}
        </div>

        <div className="p-4 border-t border-slate-100 bg-white">
          <form action={handleSendMessage} className="flex gap-2">
            <input 
              type="text" 
              name="content"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              placeholder="Type your message..." 
              required
              className="flex-1 px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#009FCE]/50 transition-all bg-slate-50 focus:bg-white"
            />
            <input type="hidden" name="subject" value="General Inquiry" />
            <button 
              type="submit" 
              disabled={isSending || !newMessage.trim()}
              className="bg-[#009FCE] hover:bg-[#007FA5] text-white p-3 rounded-xl transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Send size={20} />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
