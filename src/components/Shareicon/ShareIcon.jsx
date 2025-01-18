import { jsPDF } from 'jspdf';
import { useChat } from '../Chatbox/ChatContext';
import showToast from '../Helper/showToast';

const ShareIcon = () => {
    const { messages } = useChat();

    const handleShare = async () => {
        const chatContent = messages.map(msg => `${msg.sender}: ${msg.text}`).join('\n');
        const fileName = 'chat_history.pdf';

        const doc = new jsPDF();

        doc.text(chatContent, 10, 10);

        const pdfBlob = doc.output('blob');
        const pdfFile = new File([pdfBlob], fileName, { type: 'application/pdf' });

        // share the file directly
        if (navigator.canShare && navigator.canShare({ files: [pdfFile] })) {
            try {
                await navigator.share({
                    files: [pdfFile],
                    title: 'Chat History',
                    text: 'Here is the chat history in PDF format:',
                });
                console.log('PDF share successful');
                return;
            } catch (error) {
                console.error('Error sharing PDF:', error);
            }
        }

        // Fallback - download first
        const url = URL.createObjectURL(pdfBlob);

        // Create a link element for downloading
        const a = document.createElement('a');
        a.href = url;
        a.download = fileName;

        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);

        URL.revokeObjectURL(url);

        showToast('Download the PDF first. Direct file sharing not supported.', 5000);
    };

    return (
        <i className="ri-share-line" title="Share" onClick={handleShare}></i>
    );
};


export default ShareIcon;