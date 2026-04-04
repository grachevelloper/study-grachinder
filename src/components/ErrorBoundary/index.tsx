/* eslint-disable react-refresh/only-export-components */
import {Button, Flex, Result, theme, Typography} from 'antd';
import {Component, type ErrorInfo, type ReactNode} from 'react';
import {useTranslation} from 'react-i18next';

export type ErrorScope = 'global' | 'feed' | 'profile' | 'auth';

interface FallbackProps {
    scope: ErrorScope;
    onReset: () => void;
}

const ErrorFallbackUI = ({scope, onReset}: FallbackProps) => {
    const {t} = useTranslation('common');
    const {token: {colorBgContainer, colorBorder}} = theme.useToken();

    return (
        <Flex
            justify='center'
            align='center'
            style={{
                minHeight: scope === 'global' ? '100dvh' : '200px',
                width: '100%',
                backgroundColor: colorBgContainer,
                border: scope !== 'global' ? `1px solid ${colorBorder}` : undefined,
                borderRadius: scope !== 'global' ? 8 : undefined,
            }}
        >
            <Result
                status='error'
                title={
                    <Typography.Title level={4} style={{margin: 0}}>
                        {t(`error.${scope}.title`)}
                    </Typography.Title>
                }
                subTitle={
                    <Typography.Text type='secondary'>
                        {t(`error.${scope}.description`)}
                    </Typography.Text>
                }
                extra={
                    <Button type='primary' variant='filled' color='primary' onClick={onReset}>
                        {t(`error.${scope}.retry`)}
                    </Button>
                }
            />
        </Flex>
    );
};

interface Props {
    scope?: ErrorScope;
    children: ReactNode;
}

interface State {
    hasError: boolean;
}

export class ErrorBoundary extends Component<Props, State> {
    state: State = {hasError: false};

    static getDerivedStateFromError(): State {
        return {hasError: true};
    }

    componentDidCatch(error: Error, info: ErrorInfo) {
        console.error(
            `[ErrorBoundary:${this.props.scope ?? 'global'}]`,
            error.message,
            info.componentStack,
        );
    }

    reset = () => {
        this.setState({hasError: false});
    };

    render() {
        if (this.state.hasError) {
            const scope = this.props.scope ?? 'global';
            const onReset =
                scope === 'global' ? () => window.location.reload() : this.reset;
            return <ErrorFallbackUI scope={scope} onReset={onReset} />;
        }
        return this.props.children;
    }
}
