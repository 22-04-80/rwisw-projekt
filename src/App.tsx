import React from 'react';
import {AuthenticationView} from "./AuthenticationView";

interface AppProps {}

interface AppState {
  apiKey: string;
}

export class App extends React.Component<AppProps, AppState> {
  constructor(props: AppProps) {
    super(props);

    this.state = {apiKey: ""};
  }

  protected setUpApiKey = (apiKey: string): void => {
    this.setState({
      apiKey,
    });
  }

  public render() {
    const {apiKey} = this.state;
    return apiKey
      ? (
        <div>{apiKey}</div>
      )
      : (
        <AuthenticationView onStart={this.setUpApiKey}/>
      );
  }
}
