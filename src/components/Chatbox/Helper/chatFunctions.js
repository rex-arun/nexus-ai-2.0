import { generateBotResponse } from "./utils";
import { getNormalizedString, getSimilarity } from "./stringUtils";
const printingStatements = [
    "print",
    "printf",
    "System.out.println",
    "System.out.print",
    "console.log",
    "echo",
];
const keywords = [
    "int",
    "format",
    "return",
    "for",
    "while",
    "if",
    "else",
    "elif",
    "switch",
    "case",
    "scanf",
    "input",
    "float",
    "double",
    "char",
    "public",
    "private",
    "protected",
    "void",
    "import",
    "package",
    "function",
    "const",
    "let",
    "var",
    "try",
    "catch",
    "throw",
    "finally",
    "null",
    "undefined",
    "true",
    "type",
    "struct",
    "enum",
    "interface",
    "abstract",
    "synchronized",
    "static",
    "new",
    "delete",
    "extends",
    "implements",
    "inline",
    "global",
    "nonlocal",
    "lambda",
    "await",
    "async",
    "def",
    "yield",
    "pass",
    "break",
    "continue",
    "goto",
    "assert",
    "with",
    "from",
    "asm",
    "volatile",
    "transient",
    "final",
    "super",
    "this",
    "sizeof",
    "instanceof",
    "typename",
    "match",
    "do",
    "end",
    "begin",
    "raise",
    "except",
    "require",
    "export",
    "default",
    "foreach",
    "typeof",
    "pragma",
    "using",
    "template",
    "virtual",
    "friend",
    "namespace",
    "external",
    "open",
    "mutable",
    "sealed",
    "override",
    "where",
    "del",
    "import",
    "union",
    "elif",
    "elseif",
    "endif",
    "finally",
    "goto",
    "unless",
    "inline",
    "is",
    "not",
    "in",
    "and",
    "or",
    "begin",
    "end",
    "try",
    "catch",
    "def",
    "return",
    "raise",
    "assert",
    "pass",
    "global",
    "nonlocal",
    "break",
    "continue",
    "with",
    "del",
    "assert",
    "except",
    "import",
    "pass",
    "lambda",
    "async",
    "await",
    "from",
    "as",
    "with",
    "def",
    "lambda",
    "async",
    "await",
    "in",
    "return",
    "print",
    "printf",
    "scanf",
    "gets",
    "len",
    "append",
    "extend",
    "insert",
    "remove",
    "index",
    "count",
    "pop",
    "sort",
    "reverse",
    "join",
    "strip",
    "startswith",
    "endswith",
    "upper",
    "lower",
    "replace",
    "find",
    "split",
    "isspace",
    "isdigit",
    "isalpha",
    "isalnum",
    "isupper",
    "islower",
    "enumerate",
    "dict",
    "set",
    "list",
    "tuple",
    "frozenset",
    "range",
    "zip",
    "max",
    "min",
    "abs",
    "round",
    "pow",
    "all",
    "any",
    "ord",
    "chr",
    "hex",
    "bin",
    "id",
    "hash",
    "repr",
    "str",
    "int",
    "float",
    "bool",
    "complex",
    "bytearray",
    "bytes",
    "format",
    "map",
    "filter",
    "reduce",
    "range",
    "open",
    "close",
    "write",
    "append",
    "read",
    "readline",
    "seek",
    "tell",
    "flush",
    "random",
    "randint",
    "random",
    "uniform",
    "seed",
    "shuffle",
    "choice",
];

export const handleUserInput = async (
    event,
    messages,
    setMessages,
    setIsTyping,
    setChatStarted,
    isVoiceMode,
    speak
) => {
    if (event.key === "Enter" && event.target.value.trim() !== "") {
        const userMessage = event.target.value.trim();

        setMessages((prevMessages) => [
            ...prevMessages,
            { sender: "user", text: userMessage },
        ]);

        const loadingMessage = {
            sender: "bot",
            text: "",
            isLoading: true,
            className: "loading-dots",
        };
        setMessages((prevMessages) => [...prevMessages, loadingMessage]);

        event.target.value = "";
        setIsTyping(false);
        setChatStarted(true);

        try {
            const botResponses = await generateBotResponse(userMessage);

            // Format the bot responses
            const formattedResponses = botResponses.map(formatResponse);

            setMessages((prevMessages) => [
                ...prevMessages.slice(0, -1),
                ...formattedResponses.map((response) => ({
                    text: response,
                    sender: "bot",
                })),
            ]);

            if (isVoiceMode) {
                speak(formattedResponses.join(" "));
            }
        } catch (error) {
            console.error("Error generating bot response:", error);
            setMessages((prevMessages) => [
                ...prevMessages.slice(0, -1),
                { sender: "bot", text: "Sorry, something went wrong." },
            ]);
        }
    }
};

export const handleVoiceInput = async (
    event,
    setMessages,
    speak,
    setChatStarted,
    lastBotResponse
) => {
    const transcript = event.results[event.resultIndex][0].transcript
        .toLowerCase()
        .trim();

    if (event.results[event.resultIndex].isFinal) {
        const normalizedTranscript = getNormalizedString(transcript);
        console.log("Input:", normalizedTranscript);

        const lastResponseNormalized = lastBotResponse.current
            ? getNormalizedString(lastBotResponse.current)
            : "";

        // Check similarity using Jaccard similarity
        if (
            lastResponseNormalized &&
            getSimilarity(normalizedTranscript, lastResponseNormalized) > 0.5
        ) {
            console.log("Ignoring repeated input.");
            return;
        }

        setMessages((prevMessages) => [
            ...prevMessages,
            { sender: "user", text: transcript },
        ]);

        const loadingMessage = {
            sender: "bot",
            text: "",
            isLoading: true,
            className: "loading-dots",
        };
        setMessages((prevMessages) => [...prevMessages, loadingMessage]);

        setChatStarted(true);

        try {
            const botResponses = await generateBotResponse(transcript, true);

            // Store the last bot response
            lastBotResponse.current = botResponses.join(" ");

            setMessages((prevMessages) => [
                ...prevMessages.slice(0, -1),
                ...botResponses.map((response) => ({
                    text: response,
                    sender: "bot",
                })),
            ]);

            speak(lastBotResponse.current);
        } catch (error) {
            console.error("Error generating bot response:", error);
            setMessages((prevMessages) => [
                ...prevMessages.slice(0, -1),
                { sender: "bot", text: "Sorry, something went wrong." },
            ]);
        }
    }
};

// Function to format the response
const formatResponse = (response) => {
    return (
        response
            .replace(
                /\*\*(.*?)\*\*/g,
                '<strong class="bot-heading">$1</strong>'
            ) // Bold
            .replace(/\*(.*?)/g, "• $1") // Replace * with bullet points
            .replace(/```(\w+)[\s\S]*?```/g, (match, language) => {
                // ======= Code block ========
                // replace ``` and language name
                const codeBlock = match.replace(/```(\w+)|```/g, "").trim();

                // Escape < and > for HTML
                const escapedCodeBlock = codeBlock
                    .replace(/</g, "&lt;")
                    .replace(/>/g, "&gt;");

                const formattedCodeBlock = escapedCodeBlock
                    // Highlight quoted strings
                    .replace(/"([^"]*)"/g, (match, content) => {
                        return `<span class="quoted-string">"${content}"</span>`;
                    })

                    // Highlight keywords
                    .replace(
                        new RegExp(`\\b(${keywords.join("|")})\\b`, "g"),
                        (match) =>
                            `<span class="highlighted-keyword">${match}</span>`
                    )

                    // Highlight numbers
                    .replace(/\b\d+(\.\d+)?\b/g, (match) => {
                        return `<span class="highlighted-number">${match}</span>`;
                    })

                    // Highlight printing statements
                    .replace(
                        new RegExp(
                            `\\b(${printingStatements.join("|")})\\b`,
                            "g"
                        ),
                        (match) =>
                            `<span class="printing-statement">${match}</span>`
                    );

                // console.log(formattedCodeBlock);

                return `
                <div class="code-block-container">
                    <p class="language-name">${language}</p>
                    <pre class="code-block">${formattedCodeBlock}</pre>
                    <button class="copy-button">Copy</button>
                </div>
            `;
            })

            // inline-code `` block
            .replace(
                /`(.*?)`/g,
                (match, p1) =>
                    `<span class="inline-code">${p1
                        .replace(/</g, "&lt;")
                        .replace(/>/g, "&gt;")}</span>`
            )
            .replace(/\n/g, "<br/>") // new line
    );
};