using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Common;
using System.Linq;
using Microsoft.Data.SqlClient;
using Microsoft.EntityFrameworkCore;
using MJP.Infrastructure;

namespace MJP.Services.Extensions
{
    public static class MJPDBExtensions
    {
        public static void AddParameter<T>(this DbCommand command, string parameterName, T value)
        {
            DbParameter param = command.CreateParameter();
            param.Value = (value == null) ? (object)DBNull.Value : value;
            param.ParameterName = parameterName;
            command.Parameters.Add(param);
        }

        public static void AddTableParameter(this DbCommand command, string parameterName, 
                string tableName,
                DataTable table)
        {
            SqlParameter param = new SqlParameter(parameterName, SqlDbType.Structured);
            param.TypeName = tableName;
            param.Value = table;
            param.ParameterName = parameterName;
            command.Parameters.Add(param);
        }

        public static int ReadInteger(this DbDataReader reader, string fieldName)
        {
            int index = reader.GetOrdinal(fieldName);
            return Convert.ToInt32(reader[index]);
        }

        public static int? ReadNullableInteger(this DbDataReader reader, string fieldName)
        {
            int index = reader.GetOrdinal(fieldName);
            return (reader.IsDBNull(index) ? (int?)null : Convert.ToInt32(reader[index]));
        }


        public static decimal ReadDecimal(this DbDataReader reader, string fieldName)
        {
            int index = reader.GetOrdinal(fieldName);
            return Convert.ToDecimal(reader[index]);
        }

        public static decimal? ReadNullableDecimal(this DbDataReader reader, string fieldName)
        {
            int index = reader.GetOrdinal(fieldName);
            return (reader.IsDBNull(index) ? (decimal?)null : Convert.ToDecimal(reader[index]));
        }

    
        public static DateTime ReadDateTime(this DbDataReader reader, string fieldName)
        {
            int index = reader.GetOrdinal(fieldName);
            return Convert.ToDateTime(reader[index]);
        }

         public static DateTime? ReadNullableDateTime(this DbDataReader reader, string fieldName)
        {
            int index = reader.GetOrdinal(fieldName);
            return (reader.IsDBNull(index) ? (DateTime?)null : Convert.ToDateTime(reader[index]));
        }

        public static string ReadString(this DbDataReader reader, string fieldName)
        {
            int index = reader.GetOrdinal(fieldName);
            return Convert.ToString(reader[index]);
        }

        public static double ReadDouble(this DbDataReader reader, string fieldName)
        {
            int index = reader.GetOrdinal(fieldName);
            return Convert.ToDouble(reader[index]);
        }

        public static bool? ReadNullableBoolean(this DbDataReader reader, string fieldName)
        {
            int index = reader.GetOrdinal(fieldName);
            return reader.IsDBNull(index) ? (bool?)null: Convert.ToBoolean(reader[index]);
        }


        public static bool ReadBoolean(this DbDataReader reader, string fieldName)
        {
            //int index = reader.GetOrdinal(fieldName);
            return Convert.ToBoolean(reader[fieldName]);
        }

        public static void ExecuteDBReader(this DbCommand command, Action<DbDataReader> readerFunc)
        {
            if(command.Connection.State != System.Data.ConnectionState.Open){
                 command.Connection.Open();
            }
             try
            {
                using (DbDataReader reader = command.ExecuteReader())
                {
                    //Just call the reader function
                    //reader.Read();
                    readerFunc(reader);
                }
            }
            finally
            {
                //Close the connection..
                if(command.Connection.State == System.Data.ConnectionState.Open)
                {
                    //Close the connection
                    command.Connection.Close();
                }
            }
            
        }


       


        // public static IEnumerable<LOVItem> SelectListItems(this FructifyContext context, string lovGroupCode){
            
        //     return (from g in context.Lovgroups
        //             join l in context.Lovitems   on g.LovgroupId equals l.LovgroupId
        //             where g.LovgroupCode == lovGroupCode
        //             select new LOVItem(){
        //                 DisplayText = l.DisplayText,
        //                 Value = l.LovitemId
        //             }).ToList();
        // }


        // public static DataTable  ConvertToTable(int[] itemIds){

        //     DataTable table = new DataTable();
        //     table.Columns.Add(new DataColumn("ItemId", typeof(int)));

        //     if(itemIds != null){
        //         foreach(var id in itemIds){
        //             var row = table.NewRow();
        //             row["ItemId"] = id;

        //             table.Rows.Add(row);
        //         }
        //     }

        //     return table;
        // }
    


   
        
        public const int SELECT_ALL_VALUE = -1;

         public static SqlParameter ConvertToTableParameter(this IEnumerable<int> list,
                string parameterName, bool addNullValueForNoCount ) {
           
            const string LIST_TABLE_TYPE_NAME = "[Administration].[ListItem]";

            DataTable table = new DataTable();
            table.Columns.Add("ItemId", typeof(int));
            
            if(list != null && list.Count() > 0){
                foreach(var item in list){
             
                    DataRow row = table.NewRow();
                    //If ALLVALUE, ADD DBNull
                    row["ItemId"] = (item == SELECT_ALL_VALUE) ? DBNull.Value : item;        
                    table.Rows.Add(row);
                }
            }
            else{
                //If this is true, then when there is no value in list, NULL should be 
                //added to the result table if that option is sepecified
                if(addNullValueForNoCount){
                    DataRow row = table.NewRow();
                    row["ItemId"] = DBNull.Value;                
                    table.Rows.Add(row);
                }
            }

            SqlParameter param = new SqlParameter(parameterName, SqlDbType.Structured);
            param.TypeName = LIST_TABLE_TYPE_NAME;
            param.Value = table;
            param.ParameterName = parameterName;
            return param;
        }




        public static void UpdateExperience(this MJPContext context, int applicantId){
            //Just call the SP
            using (var cmd = context.Database.GetDbConnection().CreateCommand())
            {
                cmd.CommandText = "[administration].[UpdateExperience]";
                cmd.CommandType = System.Data.CommandType.StoredProcedure;

                cmd.AddParameter("@applicantId", applicantId);
                cmd.Connection.Open();
                cmd.ExecuteNonQuery();
                cmd.Connection.Close();
            }
        }

    }
}
