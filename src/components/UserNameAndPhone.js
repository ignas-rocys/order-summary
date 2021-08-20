const UserNameAndPhone = ({name, phone, handleDelete}) => {
    return (
        <section className="section">
            <p><b>Name</b>: {name} <b>Phone</b> : {phone}</p>
            <button className="button btn-del" onClick={ handleDelete }> Delete </button>
        </section>
    )
}

export default UserNameAndPhone;