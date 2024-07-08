"use strict";
// import React from "react";
// class PropsModel<T> {
// }
// export  class CustomAutosuggest extends React.Component {
//     constructor(props:any: any) {
//       super(props);
//       this.state = {
//         value: '',
//         suggestions: []
//       };    
//     }
//     onChange = (_, { newValue }) => {
//       const { id, onChange } = this.props;
//       this.setState({
//         value: newValue
//       });
//       onChange(id, newValue);
//     };
//     onSuggestionsFetchRequested = ({ value }) => {
//       this.setState({
//         suggestions: getSuggestions(value)
//       });
//     };
//     onSuggestionsClearRequested = () => {
//       this.setState({
//         suggestions: []
//       });
//     };
//     render() {
//       const { id, placeholder } = this.props;
//       const { value, suggestions } = this.state;
//       const inputProps = {
//         placeholder,
//         value,
//         onChange: this.onChange
//       };
//       return (
//         <Autosuggest 
//           id={id}
//           suggestions={suggestions}
//           onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
//           onSuggestionsClearRequested={this.onSuggestionsClearRequested}
//           getSuggestionValue={getSuggestionValue}
//           renderSuggestion={renderSuggestion}
//           inputProps={inputProps} 
//         />
//       );
//     }
//   }
//   class App extends React.Component {
//     onChange(id, newValue) {
//       console.log(`${id} changed to ${newValue}`);
//     }
//     render() {
//       return (
//         <div>
//           <MyAutosuggest
//             id="type-c"
//             placeholder="Type 'c'"
//             onChange={this.onChange}
//           />
//           <MyAutosuggest
//             id="type-p"
//             placeholder="Type 'p'"
//             onChange={this.onChange}
//           />
//         </div>
//       );
//     }
//   }
//   ReactDOM.render(<App />, document.getElementById('app'));
//# sourceMappingURL=AutoSuggest.js.map