const UserNameAndPhone = ({name, phone, handleDelete}) => {
    return (
        <section>
            <p>Name: {name} Phone: <b>{phone}</b></p>
            <button onClick={ handleDelete }> Delete </button>
        </section>
    )
}

export default UserNameAndPhone;