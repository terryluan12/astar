from api.models.Wishlist import Wishlist
from api.utils.database import sql_db
from sqlalchemy import Integer, String, delete, select, update
from sqlalchemy.orm import relationship, mapped_column, Mapped

class User(sql_db.Model):
    user_id: Mapped[int] = mapped_column(Integer, primary_key=True, autoincrement=True)
    username: Mapped[str] = mapped_column(String(50), unique=True)
    password: Mapped[str] = mapped_column(String(300), nullable=False)
    wished_courses: Mapped["Wishlist"] = relationship('Course', secondary=Wishlist.__table__, backref='user')
    
    def to_json(self):
        return {"username": self.username}

    def __repr__(self) -> str:
        return f"User(username={self.username})"
    
    def getWishlist(self):
        return self.wished_courses
    
    def appendWishlist(self, course_code):
        self.wished_courses.append(course_code)
        sql_db.commit()

    def removeWishlist(self, course_code):
        self.wished_courses.remove(course_code)
        sql_db.commit()

    @classmethod
    def get(cls, username):
        stmt = (
            select(cls)
            .filter_by(username = username)
        )
        results = sql_db.session.execute(stmt).scalar()
        return results
        
    
    @classmethod
    def put(cls, username, password):
        usr = cls(username=username, password=password)
        sql_db.session.add(usr)
        sql_db.session.commit()
        return True

    @classmethod
    def delete(cls, username, password):
        stmt = (
            delete(cls)
            .where(cls.username == username)
            .execution_options(synchronize_session="fetch")
        )
        sql_db.session.execute(stmt)
        sql_db.session.commit()
    
    @classmethod
    def update(cls, username, password):
        stmt = (
            update(cls)
            .where(cls.username == username)
            .values(password=password)
        )
        sql_db.session.execute(stmt)
        sql_db.session.commit()
        return True

    @classmethod
    def add_comment(cls, username, code, comment):
        usr = cls.objects(username=username).get()
        if usr:
            usr.comments[code] = comment
            usr.save()
            return True
        return False

