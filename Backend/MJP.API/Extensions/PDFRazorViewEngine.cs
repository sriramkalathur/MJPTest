
using System;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using System.Configuration;
using System.Collections.Generic;
using MJP.Entities.Models;
using Microsoft.AspNetCore.Http;
using System.Linq;
using PdfSharp.Drawing;
using PdfSharp.Pdf;

namespace MJP.API.Extensions
{
public class PDFExportTest 
{

    public void TestExport(string filename){
        PdfDocument document = new PdfDocument();
      document.Info.Title = "Created with PDFsharp";
 
      // Create an empty page
      PdfPage page = document.AddPage();
 
      // Get an XGraphics object for drawing
      XGraphics gfx = XGraphics.FromPdfPage(page);
 
      // Create a font
      var font = new PdfSharp.Drawing.XFont("Arial", 12);
 
      // Draw the text
      gfx.DrawString("Hello, World!", font, XBrushes.Black,
        new XRect(0, 0, page.Width, page.Height),
        XStringFormats.Center);
 
      // Save the document...
      
      document.Save(filename);
    
        }
}

}