from pydantic import BaseModel

class YourModelSchema(BaseModel):
    id: int
    name: str
    # Define other fields here
