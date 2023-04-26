import SearchModal from './Search Modal'


export default function Example(props) {
    if (props.showSearchModal == true) {
        return (
            <SearchModal {...props} />
        )
    }
}
