import { Suspense } from "react";
import GreetingContent from "./GreetingContent";

export default function GreetingPage() {
    return (
        <Suspense fallback={null}>
            <GreetingContent />
        </Suspense>
    );
}