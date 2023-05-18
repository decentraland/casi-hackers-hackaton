##################################################################################################
# In this section, we set the user authentication, user and app ID, model details, and the URL
# of the image we want as an input. Change these strings to run your own example.
#################################################################################################

# Your PAT (Personal Access Token) can be found in the portal under Authentification
PAT = ''
# Specify the correct user_id/app_id pairings
# Since you're making inferences outside your app's scope
USER_ID = ''
APP_ID = 'dcl-casi-hackers'
# Change these to whatever model and image URL you want to use
MODEL_ID = 'general-image-recognition'
MODEL_VERSION_ID = 'aa7f35c01e0642fda5cf400f543e7c40'

from clarifai_grpc.channel.clarifai_channel import ClarifaiChannel
from clarifai_grpc.grpc.api import resources_pb2, service_pb2, service_pb2_grpc
from clarifai_grpc.grpc.api.status import status_code_pb2
import json
import time
import requests

channel = ClarifaiChannel.get_grpc_channel()
stub = service_pb2_grpc.V2Stub(channel)
metadata = (('authorization', 'Key ' + PAT),)
userDataObject = resources_pb2.UserAppIDSet(user_id=USER_ID, app_id=APP_ID)

def process_image (image_url):
  try:
    post_model_outputs_response = stub.PostModelOutputs(
        service_pb2.PostModelOutputsRequest(
            user_app_id=userDataObject,  # The userDataObject is created in the overview and is required when using a PAT
            model_id=MODEL_ID,
            # version_id=MODEL_VERSION_ID,  # This is optional. Defaults to the latest model version
            inputs=[
                resources_pb2.Input(
                    data=resources_pb2.Data(
                        image=resources_pb2.Image(
                            url=image_url
                        )
                    )
                )
            ]
        ),
        metadata=metadata
    )
    if post_model_outputs_response.status.code != status_code_pb2.SUCCESS:
        print(post_model_outputs_response.status)
        raise Exception("Post model outputs failed, status: " + post_model_outputs_response.status.description)

    # Since we have one input, one output will exist here
    output = post_model_outputs_response.outputs[0]
    print (type(output))
    return output.data.concepts
  except Exception as e:
        print("An error occurred:", str(e))

# Uncomment this line to print the full Response JSON
#print(output)


def check_image_url(url):
    response = requests.head(url)
    return response.status_code == requests.codes.ok


# Read the JSON file
print('Reading data.json')
with open('response.json', 'a') as response:
  response.write('[')
  with open('data.json') as file:
    data = json.load(file)
  print('DATA>JSON')

  # Iterate over each JSON object and generate tags for the thumbnails
  for item in data:
    thumbnail = item.get('thumbnail')
    print('Processing: ' + item.get('name'))
    if thumbnail:
      exists = check_image_url(thumbnail)
      if exists:
        # Generate tags for the thumbnail (replace this with your code)
        tags = process_image(thumbnail)
        if tags is not None:
          item['ai_tags'] = [{'name': tag.name, 'value': tag.value} for tag in tags]
          response.write(json.dumps(item))
          response.write(',\n')
          time.sleep(1)

  response.write(']')

# Write the updated JSON data to a new file

