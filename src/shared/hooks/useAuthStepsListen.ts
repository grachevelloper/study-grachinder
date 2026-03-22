import { useEffect, useCallback } from 'react';

import { AuthEmitter, AUTH_EVENT } from '../events/auth';

interface UseAuthStepsListenProps {
    onStepChange?: (step: number) => void;
    stepCount?: number;
}

export const useAuthStepsListen = ({
    onStepChange,
    stepCount,
}: UseAuthStepsListenProps = {}) => {

    const handleSignStepChange = useCallback((newStep: number) => {
        if (stepCount !== undefined && newStep !== stepCount) {
            onStepChange?.(newStep);
        }

        if (stepCount === undefined) {
            onStepChange?.(newStep);
        }
    }, [onStepChange, stepCount]);

    useEffect(() => {
        AuthEmitter.on(AUTH_EVENT, handleSignStepChange);

        return () => {
            AuthEmitter.off(AUTH_EVENT, handleSignStepChange);
        };
    }, [handleSignStepChange]);
};