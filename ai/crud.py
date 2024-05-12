from sqlalchemy.orm import Session
import models

def get_new_data(db: Session):
    return db.query(models.YourModel).all()

# Additional CRUD functions can be added here
