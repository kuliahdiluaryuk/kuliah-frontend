type ChatMessageProps = {
    message: string;
    name: string;
    isSelf: boolean;
    hideName?: boolean;
};

export const ChatMessage = ({
    name,
    message,
    isSelf,
    hideName,
}: ChatMessageProps) => {
    return (
        <div className={`flex flex-col gap-1 ${hideName ? "pt-0" : "pt-6"}`}>
            {!hideName && (
                <div
                    className={`text-${isSelf ? "gray-700" : "text-gray-800"} uppercase text-xs`}
                >
                    {name}
                </div>
            )}
            <div
                className={`pr-4 text-${isSelf ? "gray-300" : "text-gray-500"} text-sm ${
                    isSelf ? "" : "drop-shadow-gray"
                } whitespace-pre-line`}
            >
                {message}
            </div>
        </div>
    );
};