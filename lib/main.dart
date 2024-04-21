import 'package:elitemarketv2/features/home/screens/home_screen.dart';
import 'package:elitemarketv2/router.dart';
import 'package:flutter/material.dart';

import 'constants/global_variables.dart';

class MyWidget extends StatelessWidget {
  const MyWidget({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Elite Market',
      theme: ThemeData(
        scaffoldBackgroundColor: GlobalVariables.backgroundColor,
        appBarTheme: const AppBarTheme(
          elevation: 0,
          iconTheme: IconThemeData(
            color: Colors.black
          )
        )   ),
        onGenerateRoute: (settings) => genrateRoute(settings),
        home: const HomeScreen(),
    );
  }
}