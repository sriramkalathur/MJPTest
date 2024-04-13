using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using MJP.API.Common;
using MJP.Entities.Models;
using Newtonsoft.Json;

namespace MJP.API.Common
{


    public static class ControllerExtensions
    {
        private static string GetPropertyMappingName(this Dictionary<string, string> fieldNameMappings,
                string fieldName)
        {

            if (fieldNameMappings.ContainsKey(fieldName))
            {
                //There is a mapping property Name. Set that
                return fieldNameMappings[fieldName];
            }
            else
            {
                return fieldName;
            }
        }

        private static string GetJsonParameterName(PropertyInfo property)
        {
            /* Get the JSON property with the field */
            var jsonProperty = property.GetCustomAttributes<JsonPropertyAttribute>().FirstOrDefault();
            if (jsonProperty?.PropertyName != null)
            {
                return jsonProperty.PropertyName;
            }

            return property.Name;
        }

        private static string GetJSONPropertyName(Type type, string fieldName)
        {

            /* Parse through each nested property and change the name of nested property also
            x:- x.Order.Customer.Address.Pincode -> x.order.customer.address.pincode */
            var tokens = fieldName.Split(".");


            string result;

            if (tokens.Length == 1)
            {
                //This is a direct property. No nested property..
                //So take the property of tokens[0] 
                var property = type.GetProperty(tokens[0]);
                if (property == null)
                {
                    //The property doesn't exist in type.
                    //There will be JSON field name in ModelState which is used
                    //This will be the case only when total model is NULL
                    //return the field name as it is for now
                    return fieldName;
                }
                return GetJsonParameterName(property);
            }
            else
            {
                //Array/Nested property
                result = "";
                bool isFirstTime = true;

                //Nested property. loop through each sub propery till we reach final
                //For ex:- we have asset.callibration.details.contact.addressLine1
                //So we need to travers until propertt addressLine1 to get the final type...
                //tokens[0] -> asset, tokens[1] -> details etc,.,,,
                foreach (var propName in tokens)
                {
                    var propertyName = propName;
                    int itemIndex = -1;

                    var fullPropertyName = propName;

                    if (propName.Contains("["))
                    {
                        //This is Array property like "callibrationDetails[1]"
                        //take only the propertyName for getting type..
                        int startIndex = propName.IndexOf("[");
                        int endIndex = propName.IndexOf("]");

                        //Remove the [0] from the propertyNae
                        propertyName = propName.Remove(startIndex);

                        itemIndex = Convert.ToInt32(propName.Substring(startIndex + 1, (endIndex - startIndex - 1)));
                    }


                    var property = type.GetProperty(propertyName);
                    var jsonFieldName = "";

                    if (property == null)
                    {
                        //The property doesn't exist in type.
                        //There will be JSON field name in ModelState which is used
                        //This will be the case only when total model is NULL
                        //return the field name as it is for now
                        return fieldName;
                    }
                    else
                    {
                        jsonFieldName = GetJsonParameterName(property);
                        if (itemIndex != -1)
                        {
                            //This is array like Test[100].
                            //Now the json property will be test
                            //But the actual poerty will be test[100]

                            jsonFieldName += ("[" + itemIndex + "]");
                        }
                    }

                    //Append the new parametr name
                    if (!isFirstTime)
                    {
                        //Append a "." not for the first time
                        result += ".";
                    }

                    isFirstTime = false;

                    //Get the JSON propertyName for each subpropety and append that           
                    result += jsonFieldName;

                    //Set the type to the new property name for next
                    type = property.PropertyType;

                    if (type.IsArray)
                    {
                        //Array Type. So get the type of inner element
                        type = type.GetElementType();
                    }
                }

                return result;
            }
        }


        public static IActionResult ApiValiationFailureResult(this ControllerBase controller,
                        Type modelType, int statusCode = StatusCodes.Status200OK)

        {
            //Selecct only the first error message
            var errors = controller.ModelState.Where(m => m.Value.ValidationState == Microsoft.AspNetCore.Mvc.ModelBinding.ModelValidationState.Invalid)
                        .ToDictionary(p => GetJSONPropertyName(modelType, p.Key),
                                            p => p.Value.Errors.First().ErrorMessage);

            var result = new
            {
                success = false,
                errors = errors
            };


            return controller.StatusCode(statusCode, result);
        }



       

        public static IActionResult GetValidationErrors(this Controller controller,
                   Type modelType)

        {
            var errors = controller.ModelState.Where(m => m.Value.ValidationState == Microsoft.AspNetCore.Mvc.ModelBinding.ModelValidationState.Invalid)
                        .ToDictionary(p => GetJSONPropertyName(modelType, p.Key),
                                            p => p.Value.Errors.Select(e => e.ErrorMessage));

            var result = new
            {
                success = false,
                errors = errors
            };

            return controller.Ok(result);
        }



        public static IActionResult ApiSuccessResult<T>(this ControllerBase controller,
                T response)

        {
            //By default this retunrs the ModelState.errors as dictionary so that it can handle the same
            //If additional result is required, this this needs to be customized..         
            var result = new
            {
                success = true,
                response = response
            };

            return controller.Ok(result);
        }

        public static IActionResult ApiSuccessResult(this ControllerBase controller)

        {
            //By default this retunrs the ModelState.errors as dictionary so that it can handle the same
            //If additional result is required, this this needs to be customized..         
            var result = new
            {
                success = true,
            };
            return controller.Ok(result);
        }

        public static void AddModelErrors(this ControllerBase controller, IEnumerable<ValidationError> errors)
        {

            if (errors != null)
            {
                foreach (var er in errors)
                {
                    //fieldName is the key here
                    controller.ModelState.AddModelError(er.FieldName, er.ErrorMessage);
                }
            }
        }

    }
}