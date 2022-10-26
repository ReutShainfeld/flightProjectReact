
export default new class User {

    SaveData = (user) => {
        this.ROLE = user.user_role;
       // this.NAME = user.name;
       // this.ID = user.id;
        this.UserId=user.user_id
    }
    SaveID = (user) => {
        this.ID = user.id;
    }
    UserType(){
        return this.ROLE
    }
    get_id() {
        return this.ID
    }
    get_user_id() {
        return this.UserId
    }

}